<template>
  <div ref="bpmn_canvas" id="bpmn_canvas" class="suggest-diagram" />
</template>
<script>
import BpmnViewer from "bpmn-js";
import createProcessAI from "./CreateProcessAI.js";

export default {
  props: ["text"],
  mounted() {
    this.parseDiagram();
  },
  methods: {
    async parseDiagram() {
      const { bpmn, width, height } = createProcessAI(this.text);
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
      const svgData = viewer.get("canvas")._svg.outerHTML;

      viewer.saveSVG(function (err, svgData) {
        if (err) {
          console.error("Failed to generate SVG", err);
        } else {
          ProcessMaker.apiClient.post("/export-svg", { svgData });
        }
      });
    },
  },
};
</script>
