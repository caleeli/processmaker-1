<template>
    <div class="bg-white w-full flex flex-col h-full" :class="{ 'p-6': !smallWidth }">
        <div class="flex sm:space-x-6 mb-4">
            <counter-card
                color="primary"
                :count="totalRequests"
                icon="chart-line"
                title="My Requests"
                link="/requests"
            ></counter-card>
            <counter-card
                color="light"
                count="101"
                title="My Tasks"
                icon="tasks"
                link="/tasks"
            ></counter-card>
        </div>
        <SpinnerOverlay :isLoading="loading" class="flex-1">
            <div class="overflow-auto">
                <table class="min-w-full table-auto">
                    <thead>
                        <tr class="bg-gray-100">
                            <th v-for="field in fields" :key="field.key"
                                class="px-6 py-3 border-b-2 border-gray-300 text-left text-gray-700 font-medium whitespace-nowrap">
                                {{ field.title }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="request in requests" :key="request.id"
                            class="hover:bg-gray-100 transition-colors duration-300 fixed-height-row">
                            <td v-for="field in fields" :key="field.key"
                                class="px-6 py-4 border-b border-gray-300 truncate" style="max-width:200px;">
                                <template v-if="field.key === 'case_number'">
                                    {{ request.case_number }}
                                </template>
                                <template v-else-if="field.key === 'case_title'">
                                    <a :href="`/open_request/${request.id}`">
                                        {{ request.case_title || request.name }}
                                    </a>
                                </template>
                                <template v-else-if="field.key === 'active_tasks'">
                                    <div class="line-clamp-2">
                                        <div v-for="task in getLimitedTasks(request.active_tasks)" :key="task.id">
                                            <span>{{ task.element_name }}</span>
                                        </div>
                                    </div>
                                </template>
                                <template v-else-if="field.key === 'participants'">
                                    <div class="flex items-center space-x-2">
                                        <transition-group name="avatar-fade" tag="div" class="flex">
                                            <div v-for="(participant, index) in getLimitedParticipants(request.participants)"
                                                :key="participant.id"
                                                class="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-300 animate__animated animate__zoomIn"
                                                :title="participant.fullname">
                                                <img v-if="participant.avatar" :src="participant.avatar"
                                                    :alt="participant.fullname"
                                                    class="w-full h-full object-cover bg-gray-300">
                                                <div v-else
                                                    class="w-full h-full flex items-center justify-center bg-gray-300 text-gray-500 font-semibold">
                                                    {{ participant.fullname.charAt(0) }}</div>
                                            </div>
                                        </transition-group>
                                        <span v-if="request.participants.length > 4" class="text-sm text-gray-500">+{{
                                            request.participants.length - 4 }} more</span>
                                    </div>
                                </template>
                                <template v-else-if="field.key === 'status'">
                                    <span :class="getStatusClass(request.status)"
                                        class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full transition-transform transform hover:scale-105">
                                        {{ request.status }}
                                    </span>
                                </template>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </SpinnerOverlay>
        <!-- Pagination Controls -->
        <div class="flex justify-between items-center mt-6">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1"
                class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
                <i class="fas fa-chevron-left"></i> Prev
            </button>
            <span class="text-gray-700">
                Page {{ currentPage }} of {{ totalPages }}
            </span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages"
                class="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed">
                Next <i class="fas fa-chevron-right"></i>
            </button>
        </div>
    </div>
</template>

<script>
import ShimmerLoading from '../components/ShimmerLoading.vue';
import SpinnerOverlay from '../components/SpinnerOverlay.vue';
import UpdateScreenSize from '../mixins/UpdateScreenSize';
import CounterCard from './CounterCard.vue';

export default {
    components: {
        ShimmerLoading,
        SpinnerOverlay,
        CounterCard,
    },
    mixins: [UpdateScreenSize],
    data() {
        return {
            totalRequests: 0,
            screenHeight: 0,
            requests: [],
            currentPage: 1,
            totalPages: 1,
            loading: false,
        };
    },
    computed: {
        pageSize() {
            return Math.max(Math.floor((this.screenHeight - 360) / 82), 2);
        },
        fields() {
            if (this.smallWidth) {
                return [{
                    title: '#',
                    key: 'case_number',
                }, {
                    title: 'Case Title',
                    key: 'case_title',
                }];
            } else {
                return [{
                    title: 'Case #',
                    key: 'case_number',
                }, {
                    title: 'Case Title',
                    key: 'case_title',
                }, {
                    title: 'Task',
                    key: 'active_tasks',
                }, {
                    title: 'Participants',
                    key: 'participants',
                }, {
                    title: 'Status',
                    key: 'status',
                }];
            }
        },
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
            this.loading = true;
            window.ProcessMaker.apiClient.get(`requests?include=process,participants,activeTasks&page=${this.currentPage}&per_page=${this.pageSize}`)
                .then(({ data }) => {
                    this.requests = data.data;
                    this.totalPages = data.meta.last_page;
                    this.totalRequests = data.meta.total;
                }).finally(() => {
                    this.loading = false;
                });
        },
        updateScreenHeight() {
            this.screenHeight = window.innerHeight;
        },
    },
    mounted() {
        window.addEventListener('resize', this.updateScreenHeight);
        this.updateScreenHeight();
        this.fetchRequests();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateScreenHeight);
    },
};
</script>

<style scoped>
.truncate {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.fixed-height-row {
    height: 82px;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.avatar-fade-enter-active,
.avatar-fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
}

.avatar-fade-enter,
.avatar-fade-leave-to {
    opacity: 0;
    transform: scale(0.9);
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    /* Mostrar solo dos líneas */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    /* Agregar los tres puntos (...) al final */
}
</style>