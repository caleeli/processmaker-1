<template>
    <div class="bg-white w-full flex flex-col h-full overflow-auto" :class="{ 'p-6': !smallWidth }">
        <div class="flex space-x-6 mb-4 justify-center">
            <counter-card color="primary" :count="totalRequests" icon="chart-line" title="My Requests"
                link="/requests" />
            <counter-card color="light" :count="totalTasks" title="My Tasks" icon="tasks" link="/tasks" />
            <div class="flex flex-1 border-0 justify-end relative">
                <button @click="toggleDropdown"
                    class="px-8 rounded bg-green-500 text-white hover:bg-green-600 transition-all duration-300 ease-in-out h-12">
                    <i class="fas fa-plus"></i>
                    CASE
                </button>
                <transition name="dropdown-slide" mode="out-in">
                    <div v-if="showDropdown"
                        class="absolute left-0 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg transform transition-transform duration-300 ease-out translate-y-11 z-30"
                        @click.outside="showDropdown = false">
                        <ul>
                            <li v-for="action in processes" :key="action.name" @click="startAction(action)"
                                class="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out">
                                <i :class="action.icon" class="mr-3 text-gray-600"></i>
                                <div>
                                    <div>{{ action.name }}</div>
                                    <div class="text-sm text-gray-500 line-clamp-2">{{ action.description }}</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>
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
                                    <a :href="`/open_request/${request.id}`" class="text-blue-600 hover:underline">
                                        {{ request.case_title || request.name }}
                                    </a>
                                </template>
                                <template v-else-if="field.key === 'active_tasks'">
                                    <div class="line-clamp-2">
                                        <div v-for="task in getLimitedTasks(request.active_tasks)" :key="task.id">
                                            <a v-if="task.status === 'ACTIVE' && task.element_type === 'task'" :href="`/open_task/${task.id}`"
                                                class="text-blue-600 hover:underline">
                                                {{ task.element_name }}
                                            </a>
                                            <span v-else-if="task.status === 'ACTIVE'">
                                                <i class="fas fa-spinner fa-spin mr-2"></i>
                                                {{ task.element_name }}
                                            </span>
                                            <span v-else>{{ task.element_name }}</span>
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
            totalRequests: Number(localStorage.getItem('totalRequests') || 0),
            totalTasks: Number(localStorage.getItem('totalTasks') || 0),
            screenHeight: 0,
            requests: [],
            currentPage: 1,
            totalPages: 1,
            loading: false,
            showDropdown: false,
            processes: [],
            autoRefresh: {
                time: 500,
                times: 4,
            },
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
        toggleDropdown() {
            this.showDropdown = !this.showDropdown;
        },
        startAction(action) {
            this.showDropdown = false;
            // POST to process_events/{process}?event=start
            window.ProcessMaker.apiClient.post(`process_events/${action.id}?event=${action.startEvents[0].id}`)
                .then(({ data }) => {
                    // open_request/{data.request_id}
                    window.location.href = `/open_request/${data.id}`;
                });
        },
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
        fetchRequests(showLoading = true) {
            this.loading = showLoading;
            window.ProcessMaker.apiClient.get(`requests?include=process,participants,activeTasks2&page=${this.currentPage}&per_page=${this.pageSize}&type=in_progress&order_by=id&order_direction=desc`)
                .then(({ data }) => {
                    // check if data.data is equal to this.requests
                    if (JSON.stringify(data.data) !== JSON.stringify(this.requests)) {
                        this.requests = data.data;
                        this.totalPages = data.meta.last_page;
                        this.totalRequests = data.meta.total;
                        localStorage.setItem('totalRequests', this.totalRequests);
                        this.autoRefresh.times = 3;
                        this.autoRefresh.time = 1000;
                    }
                    if (this.autoRefresh.times > 0) {
                        this.autoRefresh.times--;
                        // Find if there are any active scriptTask
                        const foundScriptTask = this.requests.find((request) => {
                            if (!request.active_tasks.length) {
                                return true;
                            }
                            return request.active_tasks.find((task) => {
                                return task.element_type === 'scriptTask';
                            });
                        });
                        if (foundScriptTask) {
                            // Fetch the tasks again after 1 second
                            setTimeout(() => {
                                this.fetchRequests(false);
                            }, this.autoRefresh.time);
                            this.autoRefresh.time *= 2;
                        }
                    }
                }).finally(() => {
                    this.loading = false;
                });
        },
        fetchTaskCount() {
            window.ProcessMaker.apiClient.get('/api/1.1/tasks/count')
                .then(({ data }) => {
                    this.totalTasks = data.count;
                    localStorage.setItem('totalTasks', this.totalTasks);
                });
        },
        fetchProcesses() {
            window.ProcessMaker.apiClient.get('start_processes')
                .then(({ data }) => {
                    this.processes = data.data;
                    // Add random icons to processes
                    this.processes.forEach((process) => {
                        process.icon = ['fas fa-briefcase', 'fas fa-clipboard', 'fas fa-cogs', 'fas fa-cube', 'fas fa-database', 'fas fa-drafting-compass', 'fas fa-file-alt', 'fas fa-file-code', 'fas fa-file-contract', 'fas fa-file-invoice', 'fas fa-file-signature', 'fas fa-folder', 'fas fa-folder-open', 'fas fa-globe', 'fas fa-hammer', 'fas fa-handshake', 'fas fa-hard-hat', 'fas fa-industry', 'fas fa-laptop-code', 'fas fa-lightbulb', 'fas fa-lock', 'fas fa-map-marked-alt', 'fas fa-map-signs', 'fas fa-money-bill-alt', 'fas fa-paint-roller', 'fas fa-pen', 'fas fa-pen-alt', 'fas fa-pen-fancy', 'fas fa-pen-nib', 'fas fa-pen-square', 'fas fa-pen-square', 'fas fa-puzzle-piece', 'fas fa-rocket', 'fas fa-screwdriver', 'fas fa-shield-alt', 'fas fa-sign', 'fas fa-signature', 'fas fa-sitemap', 'fas fa-tasks', 'fas fa-thumbs-up', 'fas fa-tools', 'fas fa-truck', 'fas fa-user-tie', 'fas fa-wrench'][Math.floor(Math.random() * 45)];
                    });
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
        this.fetchTaskCount();
        this.fetchProcesses();
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

.dropdown-slide-enter-active,
.dropdown-slide-leave-active {
    transition: transform 0.3s ease, opacity 0.3s ease;
}

.dropdown-slide-enter,
.dropdown-slide-leave-to {
    transform: translateY(-20px);
    opacity: 0;
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
