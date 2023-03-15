<template>
  <div
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
    <div
      ref="bpmn_canvas"
      class="suggest-diagram"
      style="visibility: hidden;"
    />
  </div>
</template>

<script>
import BpmnViewer from "bpmn-js";
import createProcessAI from "../../components/CreateProcessAI";

export default {
  props: {
    name: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedSuggest: null,
      suggestedDiagrams: [],
      loadingSuggestions: false,
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
    onSuggestSelect(suggest) {
      this.selectedSuggest = suggest;
      this.$emit('selected', suggest);
    },
    parseDiagrams(response) {
      if (response.data.error) {
      // eslint-disable-next-line no-console
        console.error(response.data.error);
      } else if (response.data.choices) {
        response.data.choices.forEach(async ({ text }) => {
          const foundIndex = this.suggestedDiagrams.findIndex((d) => d.code === text);
          if (foundIndex > -1) {
            return;
          }
          const { bpmn, width, height } = createProcessAI(text);
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
            code: text,
            diagram: svg,
            bpmn,
            width,
            height,
          });
        });
      }
    },
    // call api, avoid timeout
    async loadOptions(includeCache = false) {
      this.loadingSuggestions = true;
      const awaitDiagrams = [];
      if (includeCache) {
        awaitDiagrams.push(ProcessMaker.apiClient.post("processes/cached-suggested-diagrams", {
          name: this.name,
          description: this.description,
          category: this.category,
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
        category: this.category,
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
}
.suggest-option:hover {
  box-shadow: 0 0 0 4px #007bff;
}
.suggest-option-empty {
  width: calc(50% - 2rem);
  height: calc(50% - 2rem);
  overflow: hidden;
  margin: 1rem;
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
