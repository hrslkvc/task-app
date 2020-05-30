<template>
    <div class="task-list">
        <transition-group name="task-items">
            <div
                class="box task-item"
                v-for="task in sortedTasks"
                v-bind:key="task._id"
                v-bind:class="{ 'has-text-grey-light': task.completed }"
            >
                <span
                    v-bind:class="{ strikethrough: task.completed }"
                    v-on:click="markTaskComplete(task)"
                >
                    {{ task.description }}
                </span>
                <button
                    v-on:click="deleteTask(task._id)"
                    class="delete is-pulled-right has-background-danger"
                ></button>
            </div>
        </transition-group>
    </div>
</template>
<script>
import apiService from '@/services/apiService';
export default {
    name: 'TaskList',
    data() {
        return {
            tasks: [],
        };
    },
    computed: {
        sortedTasks() {
            return [...this.tasks].sort((a, b) => a.completed - b.completed);
        },
    },
    methods: {
        getAllTasks() {
            apiService.get('tasks').then(res => (this.tasks = res.data));
        },
        deleteTask(id) {
            apiService.delete(`tasks/${id}`).then(() => this.getAllTasks());
        },
        markTaskComplete(task) {
            apiService
                .patch(`tasks/${task._id}`, { completed: true })
                .then((task.completed = true));
        },
    },
    created() {
        this.getAllTasks();
        this.$root.$on('newTaskCreated', () => {
            this.getAllTasks();
        });
    },
};
</script>
<style scoped>
.strikethrough {
    text-decoration: line-through;
}

.task-item {
    transition: all 1s;
}

.task-list {
    position: relative;
}

.task-item-move {
    transition: translate 1s;
}

.task-items-enter-active,
.task-items-leave-active {
    transition: all 1s;
    transition: opacity 0.5s;
}

.task-items-leave-active {
    position: absolute;
    width: 100%;
}
.task-items-enter,
.task-items-leave-to {
    opacity: 0;
}
</style>
