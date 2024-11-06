import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios';

import App from './App.vue'
import router from './router'

// 创建一个 Axios 实例并设置 baseURL
const axiosInstance = axios.create({
    baseURL: 'http://localhost:6080/api/inspection',
});


const app = createApp(App)
app.config.globalProperties.$axios = axiosInstance;

app.use(createPinia())
app.use(router)
app.provide('$axios', axiosInstance)
app.mount('#app')

