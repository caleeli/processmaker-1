<template>
    <div class="card col-6 offset-3 p-0">
        <div class="card-body">
            <div class="ai-configs">
                <h5>AI Configs</h5>
                <p>Industry: <input class="form-control" :v-model="industry" :value="industry"/></p>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Config</th>
                        <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, key) in config" :key="key">
                            <th scope="row">{{ key }}</th>
                            <td>
                                <input class="form-control" v-model="config[key]"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="card-footer text-right">
            <button class="btn btn-primary" @click="save()">Save config</button>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
        industry: 'banking',
        config: {
            'model': '',
            'max_tokens': '',
            'temperature': '',
            'top_p': '',
            'n': '',
            'frequency_penalty': '',
            'presence_penalty': '',
            'stop': '',
        }
    };
  },
  methods: {
    fetch() {
      this.loading = true;
      ProcessMaker.apiClient
        .get("current-config?industry=" + this.industry)
        .then((response) => {
          this.config = response.data;
          this.loading = false;
        });
    },

    save() {
        let params = {
            industry: this.industry,
            config: this.config,
        }
        this.loading = true;
        ProcessMaker.apiClient
          .post("/save-config", params)
          .then((result) => {
            this.loading = false;
          });
    }
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
  //
</style>
