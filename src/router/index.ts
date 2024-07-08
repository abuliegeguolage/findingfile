import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/Home.vue';
import JourneyStart from '../pages/JourneyStart.vue';
import BoilingButton from '../pages/BoilingButton.vue';
import DarkCorridor from '../pages/DarkCorridor.vue';
import GuessDoor from '../pages/GuessDoor.vue';
import Lock from '../pages/Lock.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/journeystart', component: JourneyStart },
    { path: '/boilingbutton', component: BoilingButton },
    { path: '/darkcorridor', component: DarkCorridor },
    { path: '/guessdoor', component: GuessDoor },
    { path: '/lock', component: Lock },
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})