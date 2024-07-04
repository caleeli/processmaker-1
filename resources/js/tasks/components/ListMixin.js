const ListMixin = {
  mounted() {
    const taskListCard = document.querySelector(".mobile-container");
    taskListCard.addEventListener("scrollend", () => this.onScroll());
  },
  beforeDestroy() {
    console.log("llama destroy tasks");
    const taskListCard = document.querySelector(".mobile-container");
    taskListCard.removeEventListener("scrollend", this.onScroll());
  },
  computed: {
    columnsQuery() {
      if (this.columns && this.columns.length > 0) {
        return `&columns=${this.columns.map(c => c.field).join(",")}`;
      }
      return "";
    },
  },
  methods: {
    onScroll() {
      const container = document.querySelector(".mobile-container");
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
       if(this.totalCards>=this.perPage) {
        this.cardMessage = "show-page";
        this.sumCards = this.sumCards + this.perPage;
        this.fetch();
       }
      }
    },
    getSortParam() {
      if (this.sortOrder instanceof Array && this.sortOrder.length > 0) {
        return (
          `&order_by=${
            this.sortOrder[0].sortField
          }&order_direction=${
            this.sortOrder[0].direction}`
        );
      }
      return "";
    },
    calculateTotalPages(totalItems, itemsPerPage) {
      if (itemsPerPage <= 0) return 0;
      return Math.ceil(totalItems / itemsPerPage);
    },
    fetch() {
      Vue.nextTick(() => {
        this.$emit("on-fetch-task");
        let pmql = "";
        if (this.pmql !== undefined) {
          pmql = this.pmql;
        }
        let { filter } = this;
        let filterParams = "";
        if (filter && filter.length) {
          if (filter.isPMQL()) {
            pmql = `(${pmql}) and (${filter})`;
            filter = "";
          } else {
            filterParams = `&user_id=${
              window.ProcessMaker.user.id
            }&filter=${
              filter
            }&statusfilter=ACTIVE,CLOSED`;
          }
        }
        if (this.previousFilter !== filter) {
          this.page = 1;
        }
        this.previousFilter = filter;
        if (this.previousPmql !== pmql) {
          this.page = 1;
        }
        this.previousPmql = pmql;
        let advancedFilter = this.getAdvancedFilter ? this.getAdvancedFilter(): "";
        if (this.previousAdvancedFilter !== advancedFilter) {
          this.page = 1;
        }
        this.previousAdvancedFilter = advancedFilter;
        const include = "process,processRequest,processRequest.user,user,data".split(",");
        if (this.additionalIncludes) {
          include.push(...this.additionalIncludes);
        }
        // Load from our api client
        ProcessMaker.apiClient
          .get(
            `${this.endpoint}?page=${
              this.page
            }&include=` + include.join(",")
              + `&pmql=${
                encodeURIComponent(pmql)
              }&per_page=${
                this.perPage + this.sumCards
              }${filterParams
              }${this.getSortParam()
              }&non_system=true` +
              advancedFilter +
              this.columnsQuery,
              {
                dataLoadingId: this.dataLoadingId,
                headers: { 'Cache-Control': 'no-cache'}
              },
          )
          .then((response) => {
            this.data = this.transform(response.data);
            this.totalCards = response.data.meta.total;
            this.totalPages = this.calculateTotalPages(this.totalCards, this.perPage);
            if (this.$cookies.get("isMobile") === "true") {
              const dataIds = [];
              this.data.data.forEach((element) => {
                dataIds.push(element.id);
              });
              this.$cookies.set("tasksListMobile", JSON.stringify(dataIds));
            }
            this.$emit("in-overdue", response.data.meta.in_overdue);
          })
          .catch((error) => {
            window.ProcessMaker.alert(error.response.data.message, "danger");
            this.data = [];
          });
      });
    },
  },
};
export default ListMixin;
