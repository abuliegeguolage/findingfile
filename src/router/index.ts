import { createRouter, createWebHashHistory } from 'vue-router'

import Home from '../pages/Home.vue';
import BoilingButton from '../pages/BoilingButton.vue';
import DarkCorridor from '../pages/DarkCorridor.vue';
import GuessDoor from '../pages/GuessDoor.vue';
import Lock from '../pages/Lock.vue';
import ClawMachine from '../pages/ClawMachine.vue';
import Ending from '../pages/Ending.vue';

const routes = [
    { path: '/', component: Home },
    { path: '/boilingbutton', component: BoilingButton },
    { path: '/darkcorridor', component: DarkCorridor },
    { path: '/guessdoor', component: GuessDoor },
    { path: '/lock', component: Lock },
    { path: '/clawmachine', component: ClawMachine },
    { path: '/ending', component: Ending }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})