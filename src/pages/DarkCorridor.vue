<script setup lang="ts">
import { ref, watch } from 'vue';
import InGameHeader from '../components/InGameHeader.vue';
import PopupBox from '../components/PopupBox.vue';
import PlotCarousel from '../components/PlotCarousel.vue';

const showPlot = ref(true);

const carouselSrc = [
    {
        img: '/src/assets/images/guide/adapting_dark.png',
        speech: '呃，這裡怎麼這麼暗啊？幾乎什麼都看不到……'
    },
    {
        img: '/src/assets/images/guide/seeking_light.png',
        speech: '看來是要按照某種順序點擊牆上的按鈕，才能把燈打開的樣子？'
    }
];

const hint = `按鈕上的字母好像可以排列成一個英文單字？\n這個單字應該和機關設計者內心深處的渴望有關……\nmoney？offer？power？到底哪個單字才能用e、f、o、r這幾個字母拼出來呢？真是個棘手的問題！`;

const password = 'offer';
const buttonTextArr = ['e', 'f', 'o', 'r'];
const input = ref('');

const inDark = ref(true);

watch(input, () => {
    if (input.value === password) {
        inDark.value = false;
    }
});

</script>

<template>
    <div class="dark" :class="{ 'light-up': !inDark }"></div>

    <InGameHeader v-model="showPlot" :hint="hint"></InGameHeader>
    <PopupBox v-model="showPlot" :no-back-board="true">
        <PlotCarousel :srcs="carouselSrc" v-model="showPlot">
            <template #endingButton>
                沒問題！
            </template>
        </PlotCarousel>
    </PopupBox>

    <div class="container">
        <ul class="button-list">
            <li v-for="(text, index) in buttonTextArr" :key="index" @click="input += text"
                class="word-button button button-plain">
                {{ text }}
            </li>
        </ul>
        <div class="input-area">
            <div class="input-displayer button button-disabled">{{ input }}</div>
            <button @click="input = ''" class="button button-plain" :class="{ 'button-disabled': !inDark }"
                :disabled="!inDark">重新輸入
            </button>
        </div>
        <RouterLink to="/guessdoor" v-show="!inDark">
            <button class="button button-vitality">繼續前進！</button>
        </RouterLink>
    </div>
</template>

<style scoped lang="scss">
.dark {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, .7);
    transition: 1s;
}

.light-up {
    background-color: rgba(0, 0, 0, 0);
}

.container {
    position: relative;

    .button-list {
        display: flex;
        justify-content: space-evenly;
        width: 50%;

        @media screen and (max-width: 767px) {
            width: 100%;
        }

        .word-button {
            width: 50px;
            height: 100%;
        }
    }

    .input-area {
        display: flex;
        justify-content: center;
        width: 50%;

        @media screen and (max-width: 767px) {
            width: 100%;
        }

        .input-displayer {
            cursor: default;
            margin-right: 20px;
            width: 100px;
            height: 50px;
            line-height: 30px;

            &:hover {
                box-shadow: unset;
            }
        }
    }

}
</style>