<template>
    <div class="card col-6 offset-3 mt-3 p-0">
        <div class="card-body">
            <div class="ai-configs">
                <h5>Models ratings</h5>
                <table class="table">
                    <thead>
                        <tr>
                        <th scope="col">Model</th>
                        <th scope="col">Config</th>
                        <th scope="col">Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in ratings" :key="item.hash">
                            <th scope="row">{{ item.model }}</th>
                            <td>{{ item.config }}</td>
                            <td>{{ item.rating }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  data() {
    return {
        ratings: {
            model: 'This is my large model',
            config: 'this is my config',
            rating: '5 stars',
        },
        loading: false,
    };
  },
  methods: {
    fetch() {
      this.loading = true;
      ProcessMaker.apiClient
        .get("ratings")
        .then((response) => {
          this.ratings = response.data;
          this.loading = false;
        });
    },
  },
  mounted() {
    this.fetch();
  },
};
</script>

<style lang="scss" scoped>
  //
</style>
