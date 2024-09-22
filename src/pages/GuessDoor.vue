<script setup lang="ts">
import { ref } from 'vue';
import InGameHeader from '../components/InGameHeader.vue';
import PlotCarousel from '../components/PlotCarousel.vue';
import PopupBox from '../components/PopupBox.vue';

import illustration1 from '/src/assets/images/guide/astonished.webp';
import illustration2 from '/src/assets/images/guide/give_up_thinking.webp';

const showPlot = ref(true);

const carouselSrc = [
    {
        img: illustration1,
        speech: '這裡怎麼會有這麼多門？哪一扇才是儲藏室的門啊？'
    },
    {
        img: illustration2,
        speech: '實在沒頭緒啦……乾脆敲敲門看看會不會有回應？'
    },
];

const hint = '門太多了不知道該從何試起嗎？\n建議先點正中間的門，如果藍色提示框的訊息建議往後面找找，就可以排除前面那一半的門了！反過來也一樣～\n接著再從剩下那一半門的中間開始找，把搜查範圍一次縮小一半……很快就可以找到正確的門啦！';

const doorAmount = 15;
const rightDoorIndex = Math.floor(Math.random() * doorAmount);
const foundDoor = ref(false);

const msg = ref('挑一扇門點點看吧！');

const doorResponse = (index: number) => {
    if (index < rightDoorIndex) {
        msg.value = '不是這扇門，再往後面找找看吧～';
    } else if (index > rightDoorIndex) {
        msg.value = '不是這扇門，再往前面找找看吧～';
    } else {
        foundDoor.value = true;
        msg.value = '就是這扇門！';
    }
}

</script>

<template>
    <InGameHeader v-model="showPlot" :hint="hint"></InGameHeader>
    <PopupBox v-model="showPlot">
        <PlotCarousel :srcs="carouselSrc" v-model="showPlot">
            <template #endingButton>
                試試看吧！
            </template>
        </PlotCarousel>
    </PopupBox>

    <div class="container">
        <div class="content-box">

            <RouterLink to="/lock" :disabled="!foundDoor">
                <div class="msg middle"
                    :class="{ 'button': foundDoor, 'button-vitality': foundDoor, 'message-box': !foundDoor }">{{ msg }}
                </div>
            </RouterLink>

            <ul class="flex-list">
                <li v-for="n in doorAmount" class="door-wrapper">
                    <img src="../assets/images/item/door.webp" @click="doorResponse(n)" class="door"
                        :class="{ 'disappear': foundDoor && n !== rightDoorIndex, 'giant': foundDoor && n === rightDoorIndex }">
                </li>
            </ul>

        </div>
    </div>
</template>

<style scoped lang="scss">
.content-box {
    position: relative;

    .msg {
        position: sticky;
        top: 100px;
        margin-bottom: 20px;
        width: 300px;
        text-align: center;
    }

    .flex-list {

        .door-wrapper {
            margin: 10px 0;

            .door {
                cursor: pointer;
                width: 120px;

                @media screen and (max-width: 767px) {
                    width: 100px;
                }

                &:hover {
                    filter: drop-shadow(var(--shadow));
                }

            }

            .disappear {
                display: none;
            }

            .giant {
                cursor: default;

                @media screen and (min-width: 768px) {
                    width: 300px;
                    ;
                }

                @media screen and (max-width: 767px) {
                    width: 90vw;
                }
            }
        }
    }

}
</style>