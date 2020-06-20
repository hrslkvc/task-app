<template>
    <div>
        <div class="task-list" v-if="tasks.length">
            <transition-group name="task-items">
                <div
                    class="box task-item"
                    v-for="task in tasks"
                    v-bind:key="task._id"
                    v-bind:class="{ 'has-text-grey-light': task.completed }"
                >
                    <span
                        v-bind:class="{ strikethrough: task.completed }"
                        v-on:click="markTaskComplete(task)"
                        >{{ task.description }}</span
                    >
                    <button
                        v-on:click="deleteTask(task._id)"
                        class="delete is-pulled-right has-background-danger"
                    ></button>
                </div>
            </transition-group>
        </div>
    </div>
</template>
<script>
import apiService from '@/services/apiService';
export default {
    name: 'TaskList',
    props: ['tasks'],
    methods: {
        deleteTask(id) {
            apiService
                .delete(`tasks/${id}`)
                .then(() => this.$root.$emit('tasksUpdated'));
        },
        markTaskComplete(task) {
            apiService
                .patch(`tasks/${task._id}`, { completed: true })
                .then(() => (task.completed = true));
        },
    },
};
</script>
<style scoped>
.strikethrough {
    text-decoration: line-through;
}
.completed-tasks-divider {
    margin-bottom: 10px;
}

.task-item {
    transition: all 0.5s;
}

.task-list {
    position: relative;
}

.task-item-move {
    transition: translate 0.5s;
}

.task-items-enter-active,
.task-items-leave-active {
    transition: all 0.5s;
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
