import BpmnViewer from "bpmn-js";
import createProcessAI from "../../components/CreateProcessAI";

export default {
  parseDiagrams(response) {
    if (response.data.error) {
      // eslint-disable-next-line no-console
      console.error(response.data.error);
    } else if (response.data.options) {
      response.data.options.forEach(async (code) => {
        const foundIndex = this.suggestedDiagrams.findIndex((d) => d.code === code);
        if (foundIndex > -1) {
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
      });
    }
  },
};
