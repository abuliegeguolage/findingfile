import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/Home.vue';
import JourneyStart from '../pages/JourneyStart.vue';
import BoilingButton from '../pages/BoilingButton.vue';
import DarkCorridor from '../pages/DarkCorridor.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/journeystart', component: JourneyStart },
    { path: '/boilingbutton', component: BoilingButton },
    { path: '/darkcorridor', component: DarkCorridor },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})