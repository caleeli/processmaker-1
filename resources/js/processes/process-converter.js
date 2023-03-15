import Vue from "vue";

import ProcessPreview from "./components/ProcessPreview.vue";

Vue.component("ProcessPreview", ProcessPreview);

new Vue({
  el: "#processPreview",
  components: {
    ProcessPreview,
  }
});