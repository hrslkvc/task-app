import axios from 'axios';
import { retrieveToken } from '@/services/tokenService';
console.log(process.env.VUE_APP_API_URL);
const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.request.use(
    config => {
        const token = retrieveToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);
export default instance;
