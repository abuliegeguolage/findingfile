<script setup lang="ts">

import { computed, ref } from 'vue';
import InGameHeader from '../components/InGameHeader.vue';
import PopupBox from '../components/PopupBox.vue';
import PlotCarousel from '../components/PlotCarousel.vue';

const showPlot = ref(true);

const carouselSrc = [
    {
        img: '/src/assets/images/guide/holding_button.png',
        speech: '我本來要去儲藏室搜查看看，但是通往儲藏室的連結按鈕灰不溜丟的，沒辦法用……'
    },
    {
        img: '/src/assets/images/guide/holding_pot.png',
        speech: '剛好這裡有一口鍋，只要把按鈕放進去加熱，煮成金黃色應該就可以用了！'
    }
];

const hint = '瘋狂點擊加熱，前往儲藏室的按鈕熟了就會出鍋～';

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
    <InGameHeader v-model="showPlot" :hint="hint"></InGameHeader>
    <PopupBox v-model="showPlot">
        <PlotCarousel :srcs="carouselSrc" v-model="showPlot">
            <template #endingButton>
                沒問題！
            </template>
        </PlotCarousel>
    </PopupBox>

    <div class="container middle">
        <div class="content-box">
            <div class="pot-wrapper">
                <RouterLink to="/darkcorridor" :class="{ 'link-disable': !warmedUp, 'link-activate': warmedUp }">
                    <button class="critical-link button"
                        :class="{ 'button-disabled': !warmedUp, 'button-vitality': warmedUp }">
                        前往儲藏室
                    </button>
                </RouterLink>

                <img class="pot" src="../assets/images/item/pot.png">
            </div>

            <v-slider color="orange" direction="vertical" :modelValue="clickedNum" :max="maxClick" readonly
                trackColor="gray" class="slider"></v-slider>
        </div>


        <button @click="() => { if (!warmedUp) { clickedNum++ } }" class="heater button"
            :class="{ 'button-disabled': warmedUp, 'button-vitality': !warmedUp }">加熱</button>
    </div>
</template>

<style scoped lang="scss">
.content-box {
    display: flex;

    .pot-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        position: relative;
        width: 300px;

        .critical-link {
            position: absolute;
            left: 30%;
        }

        .button-disabled {
            top: 18%;
            transform: rotate(-20deg);
        }

        .button-vitality {
            top: 0;
        }

        .pot {
            position: absolute;
            width: 100%;
        }
    }
}
</style>