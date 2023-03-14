<template>
  <form-wizard @onComplete="onComplete">
    <tab-content :title="$t('Process Information')" :selected="true">
      <div class="form-group">
        <label for="name">{{ $t('Process') }}</label>
        <input
          type="text"
          class="form-control"
          :class="hasError('name') ? 'is-invalid' : ''"
          :placeholder="$t('Enter process name')"
          v-model="formData.name"
        >
        <div v-if="hasError('name')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.name.required">{{ $t('Please provide a valid name') }}</div>
        </div>
      </div>

      <div class="form-group">
        <label for="description">{{ $t('Description') }}</label>
        <textarea
          type="description"
          class="form-control"
          :class="hasError('description') ? 'is-invalid' : ''"
          :placeholder="$t('Enter your description')"
          v-model="formData.description"
        >
        </textarea>
        <div v-if="hasError('description')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.description.required">{{ $t('Description is required') }}</div>
        </div>
      </div>

      <div class="form-group">
        <label for="category">{{ $t('Category') }}</label>
        <select
          :class="hasError('category') ? 'is-invalid' : ''"
          class="form-control"
          v-model="formData.category"
        >
          <option value="banking">{{ $t('Banking') }}</option>
          <option value="human_resources">{{ $t('Human Resources') }}</option>
          <option value="finance">{{ $t('Finance') }}</option>
        </select>
        <div v-if="hasError('category')" class="invalid-feedback">
          <div class="error" v-if="!$v.formData.category.required">{{ $t('Please select category.') }}</div>
        </div>
      </div>
    </tab-content>
    <tab-content :title="$t('Suggested Processes')">
      <div class="form-group">
        
      </div>
    </tab-content>
    <tab-content title="Finishing Up">
      
      
    </tab-content>
  </form-wizard>
</template>

<script>
import { FormWizard, TabContent, ValidationHelper } from "vue-step-wizard";
import "vue-step-wizard/dist/vue-step-wizard.css";
import { required } from "vuelidate/lib/validators";

export default {
  name: "StepFormValidation",
  components: {
    FormWizard,
    TabContent
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
        { category: { required }}
      ]
    };
  },
  methods: {
    onComplete() {
      alert("Submitting Form ! Rock On");
    }
  }
};
</script>