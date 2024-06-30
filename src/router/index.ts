import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import Test from '../pages/Test.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/test', component: Test },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})