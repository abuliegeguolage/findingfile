<script setup lang="ts">
import { ref, computed } from 'vue';
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
    },
    {
        img: '/src/assets/images/guide/speculate_in_dark.png',
        speech: '按鈕上的字母好像可以排列成一個英文單字？這個單字應該和機關設計者內心深處的渴望有關……\n會做這種機關的，感覺就是個沒有工作的閒人，試著猜猜這個人會想要什麼吧！'
    }
];

const hint = `設計這種機關的人會想要什麼呢？\nmoney？offer？power？有哪個單字剛好能用e、f、o、r這幾個字母拼出來嗎？真是個棘手的問題！`;

const password = 'offer';
const buttonTextArr = ['e', 'f', 'o', 'r'];
const input = ref('');

const inDark = ref(true);

const showMsg = ref(false);
const guessTimes = ref(0);
const passwordDetermination = () => {
    if (input.value === password) {
        inDark.value = false;
    } else {
        showMsg.value = true;
        input.value = '';
        guessTimes.value++;
    }
};

const hintText = computed(() => {
    if(!inDark.value) {
        return '你成功了！！';
    } else if(guessTimes.value < 3) {
        return '按鈕可以重複點擊喔！';
    } else {
        return '線索不夠的話，可以試著參考上方的提示！';
    }
});

</script>

<template>
    <div class="dark" :class="{ 'light-up': !inDark }"></div>

    <InGameHeader v-model="showPlot" :hint="hint"></InGameHeader>
    <PopupBox v-model="showPlot">
        <PlotCarousel :srcs="carouselSrc" v-model="showPlot">
            <template #endingButton>
                沒問題！
            </template>
        </PlotCarousel>
    </PopupBox>

    <div class="container">
        <div class="hint-text" :style="{'color': inDark ? 'lightgray': 'gray'}">{{ hintText }}</div>
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
            <button @click="passwordDetermination" class="confirm button button-vitality"
                :class="{ 'button-disabled': !inDark }" :disabled="!inDark">確認
            </button>
        </div>
        <PopupBox v-model="showMsg" :msg-mode="true">密碼不對喔～</PopupBox>
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
    
    .hint-text {
        margin: 0 auto;
    }

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

        .confirm {
            margin-left: 10px;
        }
    }

}
</style>