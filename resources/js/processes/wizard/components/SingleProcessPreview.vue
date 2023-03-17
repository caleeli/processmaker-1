<template>
  <div class="suggested-navbar">
    <div
      class="suggested-options"
    >
        <div
          class="suggest-diagram"
          :style="`width: ${suggest.width}px; height: ${suggest.height}px;`"
          v-html="suggest.diagram"
        />
    </div>
  </div>
</template>

<script>
import BpmnViewer from "bpmn-js";
import createProcessAI from "../../components/CreateProcessAI";

export default {
  props: {
    suggest: null,
    selected: null,
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
        return this.suggestedDiagrams.slice(this.position, this.position + 1);
      }
      // get last 4 items
      return this.suggestedDiagrams.slice(this.position, this.position + 2);
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
        this.loadOptions();
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
          // this.position = Math.max(0, this.suggestedDiagrams.length - 2);
        });
      }
    },
    // call api, avoid timeout
    async loadOptions(includeCache = false) {
      this.loadingSuggestions = true;
      // this.position = 0; // Math.max(0, this.suggestedDiagrams.length - 2);
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
      // this.position = Math.max(0, this.suggestedDiagrams.length - 2);
    },
  },
};
</script>

</style>
