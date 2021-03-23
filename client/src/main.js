import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './config/store'
import './assets/css/tailwind.css'
import VueApexCharts from "vue3-apexcharts"


createApp(App).use(router).use(store).use(VueApexCharts).mount('#app')