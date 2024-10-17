import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import Echo from "laravel-echo";
import Router from "vue-router";
import ScreenBuilder, { initializeScreenCache } from "@processmaker/screen-builder";
import * as VueDeepSet from "vue-deepset";

/**
 * Setup Translations
 */
import i18next from "i18next";
import Backend from "i18next-chained-backend";
import LocalStorageBackend from "i18next-localstorage-backend";
import XHR from "i18next-xhr-backend";
import VueI18Next from "@panter/vue-i18next";
import { install as VuetableInstall } from "vuetable-2";
import MonacoEditor from "vue-monaco";
import Vue from "vue";
import VueCookies from "vue-cookies";
import Pagination from "./components/common/Pagination";
import ScreenSelect from "./processes/modeler/components/inspector/ScreenSelect.vue";
import translator from "./modules/lang.js";
import datetime_format from "./data/datetime_formats.json";
import RequestChannel from "./tasks/components/ProcessRequestChannel";
import Modal from "./components/shared/Modal";
import AccessibilityMixin from "./components/common/mixins/accessibility";
import PmqlInput from "./components/shared/PmqlInput.vue";
import DataTreeToggle from "./components/common/data-tree-toggle.vue";
import TreeView from "./components/TreeView.vue";
import FilterTable from "./components/shared/FilterTable.vue";
import PaginationTable from "./components/shared/PaginationTable.vue";
import "@processmaker/screen-builder/dist/vue-form-builder.css";

window.Vue = Vue;

window.Vue.use(BootstrapVue);
window.Vue.use(BootstrapVueIcons);
window.Vue.use(ScreenBuilder);
window.Vue.use(VueDeepSet);
window.Vue.use(VueCookies);
if (!document.head.querySelector("meta[name=\"is-horizon\"]")) {
  window.Vue.use(Router);
}
window.VueMonaco = require("vue-monaco");

window.ScreenBuilder = require("@processmaker/screen-builder");
window.VueFormElements = require("@processmaker/vue-form-elements");

window.VueRouter = Router;

window.Vue.use(VueI18Next);
VuetableInstall(window.Vue);

window.ProcessMaker = {};

