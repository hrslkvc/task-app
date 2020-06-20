<template>
    <div>
        <div class="columns is-centered page-title">
            <div class="column has-text-centered">
                <h1 class="title is-2">Task App</h1>
            </div>
        </div>
        <div class="columns">
            <div class="column is-half">
                <div class="box">
                    <h4 class="title is-4">New Task</h4>
                    <TaskForm />
                </div>
            </div>
            <div class="column is-half">
                <Tasks />
            </div>
        </div>
    </div>
</template>

<script>
import TaskForm from '@/components/TaskForm';
import Tasks from '@/components/Tasks';
export default {
    name: 'Home',
    components: {
        TaskForm,
        Tasks,
    },
};
</script>
<style scoped>
.page-title {
    margin-bottom: 50px;
}
</style>
