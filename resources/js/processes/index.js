import Vue from "vue";
import CreateProcessModal from "./components/CreateProcessModal";
import ProcessesListing from "./components/ProcessesListing";
import CategorySelect from "./categories/components/CategorySelect";

Vue.component("CategorySelect", CategorySelect);

new Vue({
  el: "#processIndex",
  components: {
    CreateProcessModal,
    ProcessesListing,
  },
  data: {
    filter: "",
    pmql: "",
    processModal: false,
    processId: null,
    showModal: false,
  },
  methods: {
    show() {
      this.processId = null;
      this.processModal = true;
    },
    edit(id) {
      this.processId = id;
      this.processModal = true;
    },
    goToImport() {
      window.location = "/processes/import";
    },
    onNLQConversion(query) {
      this.onChange(query);
      this.reload();
    },
    onChange(query) {
      this.pmql = query;
    },
    reload() {
      this.$refs.processListing.fetch();
    },
  },
});
