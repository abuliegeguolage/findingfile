<script setup lang="ts">
import { onMounted, ref } from 'vue';
import InGameHeader from '../components/InGameHeader.vue';
import PlotCarousel from '../components/PlotCarousel.vue';
import PopupBox from '../components/PopupBox.vue';

import illustration1 from '/src/assets/images/guide/saw_machine.webp';
import illustration2 from '/src/assets/images/guide/staring_machine.webp';

const showPlot = ref(true);

const carouselSrc = [
    {
        img: illustration1,
        speech: '這是……一臺夾娃娃機？'
    },
    {
        img: illustration2,
        speech: '那個盒子看起來很可疑，文件一定就藏在裡面！把它夾出來看看吧！'
    }
];

const claw = ref<any>(null);
const minX = 22;
const maxX = 54;
const oneMove = (maxX - minX) / 6;
const clawX = ref(minX);

onMounted(() => {
    claw.value.style.left = minX + '%';
});

const grabbing = ref(false);
const grabSucceed = ref(false);

const showMsg = ref(false);
const showLink = ref(false);

const grabDetermination = () => {
    grabbing.value = true;
    if (clawX.value >= minX + (maxX - minX) / 6 * 5) {
        grabSucceed.value = true;
    }
    setTimeout(() => {
        showMsg.value = true;
        grabbing.value = false;
        if (grabSucceed.value) {
            showLink.value = true;
        }
    }, 1000);
};

</script>

<template>
    <InGameHeader v-model="showPlot"></InGameHeader>

    <PopupBox v-model="showPlot">
        <PlotCarousel :srcs="carouselSrc" v-model="showPlot">
            <template #endingButton>
                沒問題！
            </template>
        </PlotCarousel>
    </PopupBox>

    <div class="content-box middle">

        <img src="../assets/images/item/box.webp" class="box" :class="{ 'box-rise': grabSucceed }">
        <img src="../assets/images/item/claw.webp" ref="claw" class="claw" :class="{ 'glow': grabbing }">

        <div class="glass"></div>
        <button @click="() => {
            clawX -= oneMove;
            claw.style.left = clawX + '%';
        }" class="arrow arrow-left button"
            :class="{ 'button-vitality': clawX > minX, 'button-disabled': clawX <= minX || grabSucceed }"
            :disabled="clawX <= minX || grabSucceed">←</button>
        <button @click="() => {
            clawX += oneMove;
            claw.style.left = clawX + '%';
        }" class="arrow arrow-right button"
            :class="{ 'button-vitality': clawX < maxX, 'button-disabled': clawX >= maxX || grabSucceed }"
            :disabled="clawX >= maxX || grabSucceed">→</button>
        <button @click="grabDetermination" class="grab button button-vitality" :class="{ 'button-disabled': grabSucceed }"
            :disabled="grabSucceed">抓取</button>

        <RouterLink to="/ending" v-show="showLink">
            <button class="link button button-vitality">打開盒子</button>
        </RouterLink>
    </div>

    <PopupBox v-model="showMsg" :msg-mode="true">
        <p v-if="!grabSucceed" class="msg">夾子距離物品太遠了，再試試看吧～</p>
        <p v-if="grabSucceed" class="msg">你成功啦！！</p>
    </PopupBox>
</template>

<style scoped lang="scss">
.content-box {
    position: relative;
    width: 400px;
    height: 580px;
    background: url(../assets/images/item/claw_machine.webp) no-repeat center top;
    background-size: 150%;

    @media screen and (max-width: 767px) {
        width: 330px;
        height: 630px;
        background-size: 200%;
    }

    .box {
        position: absolute;
        top: 213px;
        left: 222px;
        width: 70px;

        @media screen and (max-width: 767px) {
            top: 242px;
            left: 195px;
        }
    }

    .box-rise {
        transition: 1s;
        top: 115px;

        @media screen and (max-width: 767px) {
            top: 126px;
        }
    }

    .claw {
        position: absolute;
        top: 60px;
        width: 80px;

        @media screen and (max-width: 767px) {
            top: 72px;
        }
    }

    .glow {
        transition: 1s;
        filter: drop-shadow(0 0 10px white);
    }

    .glass {
        position: absolute;
        top: 10%;
        left: 21%;
        width: 58%;
        height: 39%;
        background-color: var(--glass);

        @media screen and (max-width: 767px) {
            left: 12%;
            width: 76%;
            height: 39.5%;
        }
    }

    .arrow {
        position: absolute;
        top: 320px;
        width: 60px;

        @media screen and (max-width: 767px) {
            top: 330px;
        }
    }

    .arrow-left {
        left: 120px;

        @media screen and (max-width: 767px) {
            left: 80px;
        }
    }

    .arrow-right {
        right: 120px;

        @media screen and (max-width: 767px) {
            right: 80px;
        }
    }

    .grab {
        position: absolute;
        top: 375px;
        left: 35%;
        width: 30%;

        @media screen and (max-width: 767px) {
            top: 390px;
        }
    }

    .link {
        position: absolute;
        top: 200px;
        left: 30%;
        width: 40%;
    }
}
</style>