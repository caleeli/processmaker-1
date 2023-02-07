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
        @click="generateSuggestedDiagrams"
      >
        {{ $t('Suggested diagrams') }}
      </b-button>
    </b-modal>
    <b-modal
      id="suggestProcess"
      ref="suggestProcess"
      modal-class="suggest-process-modal"
      size="lg"
      :title="$t('Suggested process')"
    >
      <div
        v-for="(suggest, index) in suggestedDiagrams"
        :key="`suggest-${index}`"
        :style="`width: ${suggest.width}px; height: ${suggest.height}px;`"
        v-html="suggest.diagram"
      />
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
      selectedSuggest: null,
      suggestedDiagrams: ["", "", ""],
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
  methods: {
    // call api, avoid timeout
    generateSuggestedDiagrams() {
      this.$refs.suggestProcess.show();
      ProcessMaker.apiClient.post("processes/suggested-diagrams", {
        name: this.name,
        description: this.description,
      }, {
        timeout: 120000,
      })
        .then(async (response) => {
          // this.suggestedDiagrams = response.data;
          if (response.data.error) {
            // eslint-disable-next-line no-console
            console.error(response.data.error);
          } else if (response.data.options) {
            this.suggestedDiagrams.splice(0, this.suggestedDiagrams.length);
            this.$nextTick(() => {
              response.data.options.forEach(async (code) => {
                const { bpmn, width, height } = createProcessAI(code);
                console.log([bpmn]);
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
                  diagram: svg,
                  bpmn,
                  width,
                  height,
                });
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
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
.suggest-diagram {
  pointer-events: none;
  width: calc(100% - 5rem);
}
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
</style>
