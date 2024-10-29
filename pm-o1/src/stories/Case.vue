<template>
    <div class="bg-white p-6 rounded-lg shadow">
        <!-- Case Header -->
        <div class="flex items-center justify-between mb-6">
            <h2 class="text-2xl font-bold">{{ caseData.case_title || caseData.name }}</h2>
        </div>

        <!-- Case Details -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div>
                <div class="flex mb-2">
                    <dt class="w-1/3 text-right font-medium">Status:</dt>
                    <dd class="w-2/3 pl-4">
                        <span class="px-2 py-1 text-white bg-blue-600 rounded-full">{{ caseData.status }}</span>
                    </dd>
                </div>
                <div class="flex mb-2">
                    <dt class="w-1/3 text-right font-medium">Created by:</dt>
                    <dd class="w-2/3 pl-4">{{ caseData.user.fullname }}</dd>
                </div>
                <div class="flex mb-2">
                    <dt class="w-1/3 text-right font-medium">Process:</dt>
                    <dd class="w-2/3 pl-4">
                        <a :href="`/process-browser/${caseData.process_id}`" class="text-blue-600 hover:underline">{{
                            caseData.name }}</a>
                    </dd>
                </div>
                <div class="flex mb-2">
                    <dt class="w-1/3 text-right font-medium">Version:</dt>
                    <dd class="w-2/3 pl-4">{{ caseData.process_version_id }}</dd>
                </div>
            </div>
            <!-- Right Column -->
            <div>
                <div class="flex mb-2">
                    <dt class="w-1/3 text-right font-medium">Last Updated:</dt>
                    <dd class="w-2/3 pl-4">{{ caseData.updated_at }}</dd>
                </div>
                <div class="flex mb-2">
                    <dt class="w-1/3 text-right font-medium">Created:</dt>
                    <dd class="w-2/3 pl-4">{{ caseData.created_at }}</dd>
                </div>
                <div class="flex mb-2">
                    <dt class="w-1/3 text-right font-medium">Participants:</dt>
                    <dd class="w-2/3 pl-4">
                        <div class="flex -space-x-2">
                            <img v-for="participant in caseData.participants" :key="participant.fullname"
                                :src="participant.avatar" :alt="participant.fullname"
                                class="w-8 h-8 rounded-full border-2 border-white" />
                        </div>
                    </dd>
                </div>
            </div>
        </div>

        <!-- Tabs -->
        <div class="mt-8">
            <div>
                <nav class="flex space-x-4 border-b">
                    <button @click="activeTab = 'tasks'" :class="tabClass('tasks')"
                        class="px-3 py-2 text-sm font-medium border-b-2">
                        Tasks
                    </button>
                    <button @click="activeTab = 'activity'" :class="tabClass('activity')"
                        class="px-3 py-2 text-sm font-medium border-b-2">
                        Last activity
                    </button>
                </nav>
            </div>
            <div class="mt-6">
                <div v-if="activeTab === 'tasks'">
                    <!-- Activities Table -->
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th class="p-3 font-medium text-gray-700 border-b">Status</th>
                                <th class="p-3 font-medium text-gray-700 border-b">Title</th>
                                <th class="p-3 font-medium text-gray-700 border-b">Start Time</th>
                                <th class="p-3 font-medium text-gray-700 border-b">Completed Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(activity, index) in tasks" :key="index">
                                <td class="p-3 border-b">
                                    <span class="px-2 py-1 text-white bg-blue-600 rounded-full">
                                        {{ activity.status }}
                                    </span>
                                </td>
                                <td class="p-3 border-b">{{ activity.element_name }}</td>
                                <td class="p-3 border-b">{{ activity.created_at }}</td>
                                <td class="p-3 border-b">{{ activity.completed_at }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div v-if="activeTab === 'activity'">
                    <!-- Feed Activities -->
                    <div v-for="(activity, index) in tasks" :key="index"
                        class="flex items-start mb-6">
                        <img :src="activity.user.avatar" :alt="activity.user.fullname"
                            class="w-10 h-10 rounded-full mr-4">
                        <div class="flex-1">
                            <div class="flex justify-between">
                                <div>
                                    <strong>{{ activity.user.fullname }}</strong> {{ activity.element_name }}<br>
                                    <small class="text-gray-500">{{ activity.created_at }}</small>
                                </div>
                                <small class="text-gray-500">{{ activity.timeAgo }}</small>
                            </div>
                            <div v-if="activity.status" class="mt-2 p-3 bg-gray-100 rounded">
                                {{ activity.status }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';

interface Participant {
    fullname: string;
    avatar: string;
}

interface Activity {
    status: string;
    title: string;
    startTime: string;
    endTime: string;
    comments: string;
}

interface CaseData {
    id: number;
    case_title: string;
    status: string;
    user: Participant;
    name: string;
    process_id: number;
    process_version_id: number;
    updated_at: string;
    created_at: string;
    participants: Participant[];
}

const props = defineProps<{ caseData: CaseData }>();

const activeTab = ref<'tasks' | 'activity'>('tasks');
const tasks = ref<Activity[]>([]);

const tabClass = (tabName: string) =>
    activeTab.value === tabName
        ? 'text-blue-600 border-blue-600'
        : 'text-gray-500 hover:text-gray-700 border-transparent';

// Load task function
const loadTasks = async () => {
    const response = await window.ProcessMaker.apiClient.get(`tasks?page=1&process_request_id=${props.caseData.id}&per_page=15&order_by=id&order_direction=desc`);
    tasks.value.splice(0, tasks.value.length, ...response.data.data);
};

// Call loadTasks on mount
loadTasks();
</script>

<style scoped>
/* Add any additional styles here if needed */
</style>
