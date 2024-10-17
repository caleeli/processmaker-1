<template>
  <div class="bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeIn">
    <transition-group name="fade" tag="div" class="overflow-hidden">
      <table class="min-w-full table-auto">
        <thead>
          <tr class="bg-gray-100 animate__animated animate__fadeInDown">
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-medium">Case #</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-medium">Case Title</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-medium">Task</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-medium">Participants</th>
            <th class="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="request in requests" 
            :key="request.id" 
            class="hover:bg-gray-100 transition-colors duration-300 fixed-height-row">
            <td class="px-6 py-4 border-b border-gray-300 truncate" style="max-width: 200px;">{{ request.case_number }}</td>
            <td class="px-6 py-4 border-b border-gray-300 truncate" style="max-width: 200px;">{{ request.case_title }}</td>
            <td class="px-6 py-4 border-b border-gray-300">
              <ul>
                <li v-for="task in getLimitedTasks(request.active_tasks)" :key="task.id" class="flex items-center space-x-1">
                  <span class="text-gray-800 font-semibold">{{ task.element_name }}</span>
                </li>
              </ul>
            </td>
            <td class="px-6 py-4 border-b border-gray-300">
              <div class="flex items-center space-x-2">
                <transition-group name="avatar-fade" tag="div" class="flex">
                  <div 
                    v-for="(participant, index) in getLimitedParticipants(request.participants)" 
                    :key="participant.id" 
                    class="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-300 animate__animated animate__zoomIn" 
                    :title="participant.fullname">
                    <img :src="participant.avatar ? participant.avatar : ''" :alt="participant.fullname" class="w-full h-full object-cover bg-gray-300">
                  </div>
                </transition-group>
                <span v-if="request.participants.length > 4" class="text-sm text-gray-500">+{{ request.participants.length - 4 }} more</span>
              </div>
            </td>
            <td class="px-6 py-4 border-b border-gray-300">
              <span :class="getStatusClass(request.status)" class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full transition-transform transform hover:scale-105">
                {{ request.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </transition-group>
    <!-- Pagination Controls -->
    <div class="flex justify-between items-center mt-6">
      <button 
        @click="changePage(currentPage - 1)" 
        :disabled="currentPage === 1" 
        class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed animate__animated animate__fadeInLeft">
        Previous
      </button>
      <span class="text-gray-700 animate__animated animate__fadeIn">Page {{ currentPage }} of {{ totalPages }}</span>
      <button 
        @click="changePage(currentPage + 1)" 
        :disabled="currentPage === totalPages" 
        class="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed animate__animated animate__fadeInRight">
        Next
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      requests: [],
      currentPage: 1,
      totalPages: 1,
      pageSize: 5,
    };
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.fetchRequests();
      }
    },
    getLimitedTasks(tasks) {
      return tasks.slice(0, 2);
    },
    getLimitedParticipants(participants) {
      return participants.slice(0, 4);
    },
    getStatusClass(status) {
      switch (status) {
        case 'ACTIVE':
          return 'bg-green-100 text-green-800';
        case 'COMPLETED':
          return 'bg-blue-100 text-blue-800';
        case 'CANCELLED':
          return 'bg-red-100 text-red-800';
        default:
          return 'bg-gray-100 text-gray-800';
      }
    },
    fetchRequests() {
      window.ProcessMaker.apiClient(`requests?include=process,participants,activeTasks&page=${this.currentPage}&per_page=${this.pageSize}`)
        .then(({ data }) => {
          this.requests = data.data;
          this.totalPages = data.meta.last_page;
        });
    },
  },
  mounted() {
    this.fetchRequests();
  },
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.fixed-height-row {
  height: 76px;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.avatar-fade-enter-active, .avatar-fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.avatar-fade-enter, .avatar-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>