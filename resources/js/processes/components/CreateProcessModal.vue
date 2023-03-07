<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <b-button
      v-b-modal.createProcess
      :aria-label="$t('Create Process')"
      class="mb-3 mb-md-0 ml-md-2"
    >
      <i class="fas fa-plus" /> {{ $t('Process') }}
    </b-button>
    <b-modal
      id="createProcess"
      :title="$t('Create Process')"
      :ok-disabled="disabled"
      @ok.prevent="onSubmit"
      @hidden="onClose"
    >
      <template v-if="countCategories">
        <required />
        <b-form-group
          required
          :label="$t('Name')"
          :description="formDescription('The process name must be unique', 'name', addError)"
          :invalid-feedback="errorMessage('name', addError)"
          :state="errorState('name', addError)"
        >
          <b-form-input
            v-model="name"
            autofocus
            autocomplete="off"
            :state="errorState('name', addError)"
            name="name"
            required
          />
        </b-form-group>
        <b-form-group
          required
          :label="$t('Description')"
          :invalid-feedback="errorMessage('description', addError)"
          :state="errorState('description', addError)"
        >
          <b-form-textarea
            v-model="description"
            required
            autocomplete="off"
            rows="3"
            :state="errorState('description', addError)"
            name="description"
          />
        </b-form-group>
        <category-select
          v-model="process_category_id"
          :label="$t('Category')"
          api-get="process_categories"
          api-list="process_categories"
          :errors="addError.process_category_id"
          name="category"
        />
        <b-form-group
          :label="$t('Upload BPMN File (optional)')"
          :invalid-feedback="errorMessage('bpmn', addError)"
          :state="errorState('bpmn', addError)"
        >
          <b-form-file
            ref="customFile"
            :browse-text="$t('Browse')"
            accept=".bpmn,.xml"
            :placeholder="selectedFile"
            :state="errorState('bpmn', addError)"
            @change="onFileChange"
          />
        </b-form-group>
      </template>
      <template v-else>
        <div>{{ $t('Categories are required to create a process') }}</div>
        <a
          href="/designer/processes/categories"
          class="btn btn-primary container mt-2"
        >
          {{ $t('Add Category') }}
        </a>
      </template>
      <!-- Button to generate suggested diagrams -->
      <b-button
        variant="primary"
        class="mb-3"
        :disabled="!description.trim()"
        @click="openSuggestedDiagrams"
      >
        {{ $t('Suggested diagrams') }}
      </b-button>
    </b-modal>
    <!-- Modal with 3 buttons MORE, CANCEL, OK -->
    <b-modal
      id="suggestProcess"
      ref="suggestProcess"
      modal-class="suggest-process-modal"
      size="lg"
      :title="$t('Suggested process')"
    >
      <div
        v-if="!selectedSuggest"
        class="suggested-options"
      >
        <div
          v-for="(suggest, index) in suggestedDiagramsCursor"
          :key="`suggest-${index}`"
          class="suggest-option"
          @click="onSuggestSelect(suggest)"
        >
          <div
            class="suggest-diagram"
            :style="`width: ${suggest.width}px; height: ${suggest.height}px;`"
            v-html="suggest.diagram"
          />
        </div>
        <div
          v-if="loadingSuggestions"
          class="suggest-option-empty"
        >
          <div
            class="spinner-border text-primary"
            role="status"
          >
            <span class="sr-only">Loading suggestions...</span>
          </div>
        </div>
      </div>
      <div
        v-else
        class="suggest-selected"
      >
        <div
          class="suggest-diagram"
          :style="`width: ${selectedSuggest.width}px; height: ${selectedSuggest.height}px;`"
          v-html="selectedSuggest.diagram"
        />
      </div>
      <template v-slot:modal-footer>
        <template v-if="!selectedSuggest">
          <b-button
            variant="secondary"
            @click="onSuggestMore"
          >
            {{ $t('More options') }}
          </b-button>
          <b-button
            variant="secondary"
            @click="onSuggestCancel"
          >
            {{ $t('Cancel') }}
          </b-button>
        </template>
        <template v-else>
          <b-button
            variant="secondary"
            @click="copyCodeToClipboard"
          >
            {{ $t('Add as example') }}
          </b-button>
          <b-button
            variant="secondary"
            @click="onSuggestBack"
          >
            {{ $t('Back') }}
          </b-button>
          <b-button
            variant="primary"
            @click="onSuggestOk"
          >
            {{ $t('Select') }}
          </b-button>
        </template>
      </template>
      <div
          ref="bpmn_canvas"
          class="suggest-diagram"
          style="visibility: hidden;"
        />
    </b-modal>
  </div>
</template>

<script>
import { FormErrorsMixin, Modal, Required } from "SharedComponents";
import BpmnViewer from "bpmn-js";
import createProcessAI from "./CreateProcessAI";

export default {
  components: { Modal, Required },
  mixins: [FormErrorsMixin],
  props: ["countCategories"],
  data() {
    return {
      loadingSuggestions: false,
      selectedSuggest: null,
      suggestedDiagrams: [],
      showModal: false,
      name: "",
      selectedFile: "",
      categoryOptions: "",
      description: "",
      process_category_id: "",
      addError: {},
      status: "",
      bpmn: "",
      disabled: false,
    };
  },
  computed: {
    suggestedDiagramsCursor() {
      if (this.loadingSuggestions) {
        // get last 3 items
        return this.suggestedDiagrams.slice(-3);
      }
      // get last 4 items
      return this.suggestedDiagrams.slice(-4);
    },
  },
  methods: {
    copyToClipboard(textToCopy) {
      // navigator clipboard api needs a secure context (https)
      if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
      } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
          // here the magic happens
          document.execCommand('copy') ? res() : rej();
          textArea.remove();
        });
      }
    },
    copyCodeToClipboard() {
      this.copyToClipboard(this.selectedSuggest.code);
      console.log(this.selectedSuggest.code);
    },
    onSuggestBack() {
      this.selectedSuggest = null;
    },
    onSuggestSelect(suggest) {
      this.selectedSuggest = suggest;
    },
    onSuggestOk() {
      this.$refs.suggestProcess.hide();
      this.$refs.addProcess.hide();
      this.$emit("suggest-ok", this.selectedSuggest);
    },
    onSuggestCancel() {
      this.$refs.suggestProcess.hide();
    },
    onSuggestMore() {
      this.generateSuggestedDiagrams(false);
    },
    openSuggestedDiagrams() {
      this.$refs.suggestProcess.show();
      this.suggestedDiagrams.splice(0, this.suggestedDiagrams.length);
      this.generateSuggestedDiagrams(true);
    },
    parseDiagrams(response) {
      // this.suggestedDiagrams = response.data;
      if (response.data.error) {
        // eslint-disable-next-line no-console
        console.error(response.data.error);
      } else if (response.data.options) {
        //this.$nextTick(() => {
        response.data.options.forEach(async (code) => {
          const foundIndex = this.suggestedDiagrams.findIndex((d) => d.code === code);
          if (foundIndex > -1) {
            // // move to the end
            // this.suggestedDiagrams.push(this.suggestedDiagrams[foundIndex]);
            // this.suggestedDiagrams.splice(foundIndex, 1);
            return;
          }
          const { bpmn, width, height } = createProcessAI(code);
          if (!bpmn) {
            return;
          }
          this.$refs.bpmn_canvas.innerHTML = "";
          const viewer = new BpmnViewer({
            container: this.$refs.bpmn_canvas,
            width,
            height,
          });
          await viewer.importXML(bpmn);
          await viewer.get("canvas").zoom("fit-viewport");
          // eslint-disable-next-line no-underscore-dangle
          const svg = viewer.get("canvas")._svg.outerHTML;
          this.suggestedDiagrams.push({
            code,
            diagram: svg,
            bpmn,
            width,
            height,
          });
          //});
        });
      }
    },
    // call api, avoid timeout
    async generateSuggestedDiagrams(includeCache) {
      this.loadingSuggestions = true;
      const awaitDiagrams = [];
      if (includeCache) {
        awaitDiagrams.push(ProcessMaker.apiClient.post("processes/cached-suggested-diagrams", {
          name: this.name,
          description: this.description,
        }, {
          timeout: 120000,
        })
          .then(async (response) => {
            this.parseDiagrams(response);
          })
          .catch((error) => {
            console.log(error);
          }));
      }
      awaitDiagrams.push(ProcessMaker.apiClient.post("processes/suggested-diagrams", {
        name: this.name,
        description: this.description,
      }, {
        timeout: 360000,
      })
        .then(async (response) => {
          this.parseDiagrams(response);
        })
        .catch((error) => {
          console.log(error);
        }));
      await Promise.all(awaitDiagrams);
      this.loadingSuggestions = false;
    },
    browse() {
      this.$refs.customFile.click();
    },
    onFileChange(e) {
      const files = e.target.files || e.dataTransfer.files;

      if (!files.length) {
        return;
      }

      this.selectedFile = files[0].name;
      this.file = files[0];
    },
    onClose() {
      this.name = "";
      this.description = "";
      this.process_category_id = "";
      this.status = "";
      this.addError = {};
      this.selectedFile = "";
      this.file = null;
    },
    onSubmit() {
      this.errors = {
        name: null,
        description: null,
        process_category_id: null,
        status: null,
      };
      if (this.process_category_id === "") {
        this.addError = { process_category_id: ["{{__('The category field is required.')}}"] };
        return;
      }
      // single click
      if (this.disabled) {
        return;
      }
      this.disabled = true;

      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("description", this.description);
      formData.append("process_category_id", this.process_category_id);
      if (this.file) {
        formData.append("file", this.file);
      }

      ProcessMaker.apiClient.post(
        "/processes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
        .then((response) => {
          ProcessMaker.alert(this.$t("The process was created."), "success");
          window.location = `/modeler/${response.data.id}`;
        })
        .catch((error) => {
          this.disabled = false;
          this.addError = error.response.data.errors;
        });
    },
  },
};
</script>

<style>
.suggest-diagram .bjs-powered-by {
  display: none;
}
.suggest-process-modal.modal {
  padding: 0 !important;
}
.suggest-process-modal.modal .modal-dialog {
  width: 100%;
  max-width: none;
  height: 100%;
  margin: 0;
}
.suggest-process-modal.modal .modal-content {
  height: 100%;
  border: 0;
  border-radius: 0;
}
.suggest-process-modal.modal .modal-body {
  overflow-y: auto;
}
.suggested-options {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.suggest-option {
  width: calc(50% - 2rem);
  height: calc(50% - 2rem);
  overflow: auto;
  cursor: grab;
  margin: 1rem;
  border: 1px solid black;
  /* center content */
  /*display: flex;
  justify-content: center;
  align-items: center;*/
}
.suggest-option:hover {
  /* primary color shadow */
  box-shadow: 0 0 0 4px #007bff;
}
.suggest-option-empty {
  width: calc(50% - 2rem);
  height: calc(50% - 2rem);
  overflow: hidden;
  margin: 1rem;
  /* center content */
  display: flex;
  justify-content: center;
  align-items: center;
}
.suggest-diagram svg {
  pointer-events: none;
}
.suggest-selected {
  width: calc(100% - 2rem);
  height: calc(100% - 2rem);
  overflow: auto;
  margin: 1rem;
  border: 1px solid black;
  box-shadow: 0 0 0 4px #007bff;
}
</style>
