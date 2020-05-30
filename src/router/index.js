import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import { retrieveToken } from '../services/tokenService';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: {
            auth: true,
        },
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
    },
];

const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
        const token = retrieveToken();
        console.log(token);
        if (!token) {
            next({
                path: '/login',
            });
        } else {
            next();
        }
    } else {
        next(); // make sure to always call next()!
    }
});
export default router;
