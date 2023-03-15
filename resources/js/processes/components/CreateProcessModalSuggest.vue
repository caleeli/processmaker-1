<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <b-button
      v-b-modal.createProcessSuggest
      :aria-label="$t('Create Process')"
      class="mb-3 mb-md-0 ml-md-2"
      variant="info"
    >
      <i class="fas fa-plus" /> {{ $t("Process Wizard") }}
    </b-button>

    <b-modal
      id="createProcessSuggest"
      centered
      modal-class="suggest-process-modal"
      size="xl"
      :title="$t('Create Process')"
      :hide-footer="true"
      @ok.prevent="onSubmit"
      @hidden="onClose"
    >
      <b-card-body class="wizard-body">
        <StepFormValidation @save_process="onSubmit"></StepFormValidation>
      </b-card-body>
    </b-modal>
  </div>
</template>

<script>
import { FormErrorsMixin, Modal, Required } from "SharedComponents";
import BpmnViewer from "bpmn-js";
import StepFormValidation from "../wizard/components/StepFormValidation";

export default {
  components: { Modal, Required, StepFormValidation },
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
          document.execCommand("copy") ? res() : rej();
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
          const foundIndex = this.suggestedDiagrams.findIndex(
            (d) => d.code === code
          );
          if (foundIndex > -1) {
            // // move to the end
            // this.suggestedDiagrams.push(this.suggestedDiagrams[foundIndex]);
            // this.suggestedDiagrams.splice(foundIndex, 1);
            return;
          }
          const { bpmn, width, height } = createProcessSuggestAI(code);
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
        awaitDiagrams.push(
          ProcessMaker.apiClient
            .post(
              "processes/cached-suggested-diagrams",
              {
                name: this.name,
                description: this.description,
              },
              {
                timeout: 120000,
              }
            )
            .then(async (response) => {
              this.parseDiagrams(response);
            })
            .catch((error) => {
              console.log(error);
            })
        );
      }
      awaitDiagrams.push(
        ProcessMaker.apiClient
          .post(
            "processes/suggested-diagrams",
            {
              name: this.name,
              description: this.description,
            },
            {
              timeout: 360000,
            }
          )
          .then(async (response) => {
            this.parseDiagrams(response);
          })
          .catch((error) => {
            console.log(error);
          })
      );
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
    onSubmit(value) {
      this.name = value.name;
      this.description = value.description;
      this.process_category_id = 2;

      this.errors = {
        name: null,
        description: null,
        process_category_id: null,
        status: null,
      };
      if (this.process_category_id === "") {
        this.addError = {
          process_category_id: ["{{__('The category field is required.')}}"],
        };
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
      formData.append("bpmn", value.file);
      if (this.file) {
        formData.append("file", this.file);
      }

      ProcessMaker.apiClient
        .post("/processes", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
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
  padding: 4rem 4rem 1rem 4rem;
}
.suggest-process-modal.modal .modal-content {
  height: 100%;
}
.suggest-process-modal.modal .modal-body {
  overflow-y: auto;
}
.wizard-body {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  padding: 0px;
}
.wizard-body .step-body {
  height: calc(100% - 210px);
  overflow: hidden;
}
</style>
