<script setup lang="ts">

import { computed, ref } from 'vue';
import PopupBox from '../components/PopupBox.vue';
import PlotCarousel from '../components/PlotCarousel.vue';

const showPlot = ref(true);

const carouselSrc = [
    {
        img: '/src/assets/images/guide/holding_button.png',
        speech: '我聽說首頁被收進儲藏室了，但是通往儲藏室的連結按鈕灰不溜丟的，沒辦法用……'
    },
    {
        img: '/src/assets/images/guide/holding_pot.png',
        speech: '剛好這裡有一口鍋，只要把按鈕放進去加熱，煮成金黃色應該就可以用了！'
    }
];

const clickedNum = ref(0);
const maxClick = 10;
const warmedUp = computed(() => {
    if (clickedNum.value < maxClick) {
        return false;
    } else {
        return true;
    }
});

</script>

<template>
    <PopupBox v-model="showPlot">
        <PlotCarousel :srcs="carouselSrc"></PlotCarousel>
    </PopupBox>

    <div class="container middle">
        <RouterLink to="/darkcorridor" :class="{ 'link-disable': !warmedUp, 'link-activate': warmedUp }">
            <button class="critical-link button" :class="{ 'button-disabled': !warmedUp, 'button-vitality': warmedUp }">
                前往儲藏室
            </button>
        </RouterLink>

        <img class="pot" src="../assets/images/item/pot.png">

        <v-slider color="orange" direction="vertical" :modelValue="clickedNum" :max="maxClick" readonly trackColor="gray"
            class="slider"></v-slider>

        <button @click="() => { if (!warmedUp) { clickedNum++ } }" class="heater button"
            :class="{ 'button-disabled': warmedUp, 'button-vitality': !warmedUp }">加熱</button>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    position: relative;
    width: 100%;
    height: 70vh;

    @media screen and (max-width: 767px) {
        margin-top: 18vh;
        height: 50vh;
    }

    .link-disable {
        margin-top: 30vh;

        @media screen and (max-width: 767px) {
            margin-top: 25vh;
        }
    }

    .link-activate {
        margin-top: 10vh;
    }

    .pot {
        position: absolute;
        top: 25%;
        left: 35%;
        width: 30%;

        @media screen and (max-width: 767px) {
            top: 35%;
            left: 25%;
            width: 50%;
        }
    }

    .slider {
        position: absolute;
        top: 10%;
        right: 30%;

        @media screen and (max-width: 767px) {
            right: 10%;
        }
    }

    .heater {
        position: relative;
        bottom: 0;
    }
}
</style>