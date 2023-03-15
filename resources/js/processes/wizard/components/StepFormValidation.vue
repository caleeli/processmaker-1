<template>
  <form-wizard
    class="wizard"
    @onComplete="onComplete"
    @onNextStep="nextStep"
    @onPreviousStep="previousStep"
  >
    <tab-content :title="$t('Process Information')" :selected="true">
      <div class="form-group">
        <label for="name">{{ $t("Process") }}</label>
        <input
          v-model="formData.name"
          type="text"
          class="form-control"
          :class="hasError('name') ? 'is-invalid' : ''"
          :placeholder="$t('Enter process name')"
        />
        <div v-if="hasError('name')" class="invalid-feedback">
          <div v-if="!$v.formData.name.required" class="error">
            {{ $t("Please provide a valid name") }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="description">{{ $t("Description") }}</label>
        <textarea
          v-model="formData.description"
          type="description"
          class="form-control"
          :class="hasError('description') ? 'is-invalid' : ''"
          :placeholder="$t('Enter your description')"
        />
        <div v-if="hasError('description')" class="invalid-feedback">
          <div v-if="!$v.formData.description.required" class="error">
            {{ $t("Description is required") }}
          </div>
        </div>
      </div>

      <div class="form-group">
        <label for="category">{{ $t("Category") }}</label>
        <select
          v-model="formData.category"
          :class="hasError('category') ? 'is-invalid' : ''"
          class="form-control"
        >
          <option value="banking">
            {{ $t("Banking") }}
          </option>
          <option value="human_resources">
            {{ $t("Human Resources") }}
          </option>
          <option value="finance">
            {{ $t("Finance") }}
          </option>
        </select>
        <div v-if="hasError('category')" class="invalid-feedback">
          <div v-if="!$v.formData.category.required" class="error">
            {{ $t("Please select category.") }}
          </div>
        </div>
      </div>
    </tab-content>
    <tab-content :title="$t('Suggested Processes')">
      <div class="form-group">
        <processes-preview
          ref="processesPreview"
          :name="formData.name"
          :description="formData.description"
          :category="formData.category"
          @selected="selectedProcess"
        />
      </div>
    </tab-content>
    <tab-content title="Finishing Up" />
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent, ValidationHelper } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
import { required } from "vuelidate/lib/validators";
import ProcessesPreview from "./ProcessesPreview.vue";

export default {
  name: "StepFormValidation",
  components: {
    FormWizard,
    TabContent,
    ProcessesPreview,
  },
  mixins: [ValidationHelper],
  data() {
    return {
      formData: {
        name: "",
        description: null,
        category: null,
      },
      validationRules: [
        { name: { required }, description: { required } },
        { category: { required } },
      ],
    };
  },
  methods: {
    onComplete() {
      this.$emit("saveprocess", this.formData);
    },
    nextStep() {
      if (this.storeState.currentTab === 0) {
        this.loadOptions();
      }
    },
    previousStep() {
      console.log("previousStep", this.storeState.currentTab);
    },
    ///
    async loadOptions() {
      await this.$nextTick();
      this.$refs.processesPreview.loadOptions();
    },
    selectedProcess(value) {
      this.formData.file = value.bpmn;
    },
  },
};
</script>

<style scoped>
.wizard {
  width: 100%;
  padding: 0rem 1rem;
  background: white;
  height: 100%;
}
.step-body > form {
  height: 100%;
}
.step-body > form > div {
  height: 100%;
}
.step-footer {
  margin: 0rem;
}
.step-button-previous {
  border-radius: 0.2rem;
  background-color: #00875a;
  border-color: #00875a;
}
.step-button-next {
  border-radius: 0.2rem;
  background-color: #104a75;
  border-color: #104a75;
}
</style>
