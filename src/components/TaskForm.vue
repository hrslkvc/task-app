<template>
    <div class="new-task-form">
        <div class="field">
            <label for="new-task-description" class="label">Description</label>
            <div class="control">
                <textarea
                    v-model="taskDescription"
                    class="textarea"
                    id="new-task-description"
                />
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button
                    type="submit"
                    class="button is-primary"
                    v-on:click.prevent="handleSubmit"
                >
                    Submit
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import apiService from '@/services/apiService';
export default {
    name: 'TaskForm',
    data() {
        return {
            taskDescription: null,
        };
    },
    methods: {
        handleSubmit() {
            apiService
                .post('tasks', { description: this.taskDescription })
                .then(() => {
                    this.taskDescription = null;
                    this.$root.$emit('newTaskCreated');
                });
        },
    },
};
</script>
