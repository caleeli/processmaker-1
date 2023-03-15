<template>
  <div class="suggested-navbar">
    <a href="#" @click="previous">
      <i class="fa fa-chevron-left"></i>
    </a>
    <div class="suggested-options">
      <div
        v-for="(suggest, index) in suggestedDiagramsCursor"
        :key="`suggest-${index}`"
        :class="`suggest-option ${
          selectedSuggest === suggest ? 'suggest-option-selected' : ''
        }`"
        @click="onSuggestSelect(suggest)"
      >
        <div
          class="suggest-diagram"
          :style="`width: ${suggest.width}px; height: ${suggest.height}px;`"
          v-html="suggest.diagram"
        />
      </div>
      <div v-if="loadingSuggestions" class="suggest-option-empty">
        <div class="spinner-border text-primary" role="status">
          <span class="sr-only">Loading suggestions...</span>
        </div>
      </div>
      <div
        ref="bpmn_canvas"
        class="suggest-diagram"
        style="visibility: hidden"
      />
    </div>
    <a href="#" @click="next">
      <i class="fa fa-chevron-right"></i>
    </a>
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
      position: 0,
    };
  },
  computed: {
    suggestedDiagramsCursor() {
      if (this.loadingSuggestions) {
        // get last 3 items
        return this.suggestedDiagrams.slice(this.position, 1);
      }
      // get last 4 items
      return this.suggestedDiagrams.slice(this.position, 2);
    },
  },
  methods: {
    previous() {
      this.position = Math.max(0, this.position - 1);
    },
    next() {
      this.position = Math.min(
        this.suggestedDiagrams.length - 1,
        this.position + 1
      );
      const isLast = this.position === this.suggestedDiagrams.length - 1;
      if (isLast && !this.loadingSuggestions) {
        this.loadSuggestions();
      }
    },
    onSuggestSelect(suggest) {
      this.selectedSuggest = suggest;
      this.$emit("selected", suggest);
    },
    parseDiagrams(response) {
      if (response.data.error) {
        // eslint-disable-next-line no-console
        console.error(response.data.error);
      } else if (response.data.choices) {
        response.data.choices.forEach(async ({ text }) => {
          const foundIndex = this.suggestedDiagrams.findIndex(
            (d) => d.code === text
          );
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
          this.position = Math.max(0, this.suggestedDiagrams.length - 1);
        });
      }
    },
    // call api, avoid timeout
    async loadOptions(includeCache = false) {
      this.loadingSuggestions = true;
      this.position = Math.max(0, this.suggestedDiagrams.length - 2);
      const awaitDiagrams = [];
      if (includeCache) {
        awaitDiagrams.push(
          ProcessMaker.apiClient
            .post(
              "processes/cached-suggested-diagrams",
              {
                name: this.name,
                description: this.description,
                category: this.category,
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
              category: this.category,
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
      this.position = Math.max(0, this.suggestedDiagrams.length - 2);
    },
  },
};
</script>

<style>
.suggest-diagram .bjs-powered-by {
  display: none;
}
.suggested-navbar {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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
  height: calc(100% - 2rem);
  overflow: auto;
  cursor: grab;
  margin: 1rem;
  border: 1px solid black;
}
.suggest-option:hover {
  box-shadow: 0 0 0 4px #007bff;
}
.suggest-option-selected {
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
