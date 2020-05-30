<template>
    <div class="columns is-centered">
        <div class="column has-text-centered is-half">
            <h1 class="title">Register</h1>
            <form>
                <div class="field">
                    <label for="email-input" class="label is-pulled-left"
                        >Email</label
                    >
                    <div class="control">
                        <input
                            type="text"
                            name="email"
                            id="email-input"
                            class="input"
                            v-model="email"
                        />
                    </div>
                </div>
                <div class="field">
                    <label for="name-input" class="label is-pulled-left"
                        >Name</label
                    >
                    <div class="control">
                        <input
                            type="text"
                            name="first_name"
                            id="name-input"
                            class="input"
                            v-model="first_name"
                        />
                    </div>
                </div>
                <div class="field">
                    <label for="password-input" class="label is-pulled-left"
                        >Password</label
                    >
                    <div class="control">
                        <input
                            type="password"
                            name="password"
                            id="password-input"
                            class="input"
                            v-model="password"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    class="button is-pulled-left is-primary"
                    v-on:click.prevent="handleSubmit"
                >
                    Submit
                </button>
                <div>{{ response }}</div>
            </form>
        </div>
    </div>
</template>
<script>
import apiService from '@/services/apiService';
import { saveToken } from '@/services/tokenService';
export default {
    name: 'RegisterForm',
    data() {
        return {
            email: null,
            password: null,
            first_name: null,
            response: 'abc',
        };
    },
    methods: {
        handleSubmit() {
            apiService
                .post('users', {
                    password: this.password,
                    email: this.email,
                    name: this.first_name,
                })
                .then(res => {
                    saveToken(res.data.token);
                    this.$router.push('/');
                    this.response = res.data;
                })
                .catch(res => (this.response = JSON.stringify(res)));
            console.log(this.email);
        },
    },
};
</script>
