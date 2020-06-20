<template>
    <div>
        <div class="box">
            <h4 class="title is-4">My Tasks</h4>
            <TaskList v-bind:tasks="activeTasks" v-if="activeTasks.length" />
            <p v-else>No tasks, add one through the form on the left</p>
        </div>
        <div class="box" v-if="completedTasks.length">
            <h4 class="title is-4">Completed Tasks</h4>
            <TaskList v-bind:tasks="completedTasks" />
        </div>
    </div>
</template>
<script>
import TaskList from '@/components/TaskList';
import apiService from '@/services/apiService';
export default {
    name: 'Tasks',
    components: { TaskList },
    data() {
        return {
            tasks: [],
        };
    },
    computed: {
        activeTasks() {
            return [...this.tasks]
                .filter(task => !task.completed)
                .sort((a, b) => a.completed - b.completed);
        },
        completedTasks() {
            return [...this.tasks]
                .filter(task => task.completed)
                .sort((a, b) => a.completed - b.completed);
        },
    },
    methods: {
        getAllTasks() {
            apiService.get('tasks').then(res => (this.tasks = res.data));
        },
    },
    created() {
        this.getAllTasks();
        this.$root.$on('tasksUpdated', () => {
            this.getAllTasks();
        });
    },
};
</script>
