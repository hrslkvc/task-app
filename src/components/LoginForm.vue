<template>
    <div class="columns is-centered">
        <div class="column has-text-centered is-half">
            <h1 class="title">Log in</h1>
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
                <div class="field">
                    <div class="control">
                        <button
                            type="submit"
                            class="button is-pulled-left is-primary"
                            v-on:click.prevent="handleSubmit"
                        >
                            Submit
                        </button>
                    </div>
                </div>
                <div class="field">
                    <div class="control has-text-centered">
                        <p>
                            Don't have an account?
                            <router-link :to="{ name: 'register' }"
                                >Register</router-link
                            >
                        </p>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import apiService from '@/services/apiService';
import { saveToken } from '@/services/tokenService';
export default {
    name: 'LoginForm',
    data: function() {
        return {
            email: null,
            password: null,
            first_name: null,
        };
    },
    methods: {
        handleSubmit() {
            apiService
                .post('users/login', {
                    password: this.password,
                    email: this.email,
                })
                .then(res => {
                    saveToken(res.data.token);
                    this.$router.push('home');
                });
        },
    },
};
</script>
