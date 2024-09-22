<script setup lang="ts">
import { computed, ref } from 'vue';
import InGameHeader from '../components/InGameHeader.vue';
import PlotCarousel from '../components/PlotCarousel.vue';
import PopupBox from '../components/PopupBox.vue';

import illustration1 from '/src/assets/images/guide/saw_lock.webp';
import illustration2 from '/src/assets/images/guide/saw_note.webp';

const showPlot = ref(true);

const carouselSrc = [
    {
        img: illustration1,
        speech: '儲藏室的門上鎖了！居然還是密碼鎖？'
    },
    {
        img: illustration2,
        speech: '門上的便利貼說不定會有關於密碼的線索，調查看看吧！'
    }
];

const hint = `
三張便利貼的顏色剛好可以對應到密碼鎖三個格子的背景色耶！\n
粉紅便利貼提到了「七」月；
黃色便利貼提到了「零」丁洋；
藍色便利貼提到了「八」小時……\n
不知道這些資訊會不會跟密碼有關呢？`;

interface Inote {
    color: string,
    content: string
};

const notes: Inote[] = [
    {
        color: 'lightyellow',
        content: '每日一詩：\n「惶恐灘頭說惶恐，零丁洋裡歎零丁。」——宋．文天祥〈過零丁洋〉'
    },
    {
        color: 'lightblue',
        content: '今日目標：\n睡滿八小時！'
    },
    {
        color: 'pink',
        content: '你絕對不知道的冷知識：\n這張便條紙是七月七日寫的喔～'
    }
];

const isShowNote = ref(false);
const noteIndex = ref(0);

const showNote = (index: number) => {
    noteIndex.value = index;
    isShowNote.value = true;
};

const input0 = ref(0);
const input1 = ref(0);
const input2 = ref(0);
const unLocked = computed(() => {
    if (input0.value === 7 && input1.value === 0 && input2.value === 8) {
        return true;
    } else {
        return false;
    }
});

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

    <div class="content-box">
        <ul class="flex-list middle">
            <li v-for="(item, index) in notes" :key="index" class="tiny-note" @click="showNote(index)"
                :style="{ 'backgroundColor': item.color }">
                {{ '———\n———\n———' }}
            </li>
        </ul>

        <PopupBox v-model="isShowNote" :msg-mode="true" :noBackBoard="true" :noLine="true">
            <div class="note" :style="{ 'background-color': notes[noteIndex].color }">
                {{ notes[noteIndex].content }}
            </div>
        </PopupBox>

        <div class="closeup">
            <div class="horn"></div>

            <div class="great" :class="{ 'greater': unLocked }">GREAT</div>
            <div class="exclamation" :class="{ 'greater-mark': unLocked }">!</div>

            <ul class="password-list">
                <li>
                    <input type="number" v-model="input0" class="password" :class="{ 'reverse': unLocked }"
                        style="background-color: pink;">
                </li>
                <li>
                    <input type="number" v-model="input1" class="password" :class="{ 'reverse': unLocked }"
                        style="background-color: lightyellow;">
                </li>
                <li>
                    <input type="number" v-model="input2" class="password" :class="{ 'reverse': unLocked }"
                        style="background-color: lightblue;">
                </li>
            </ul>
            <RouterLink to="/clawmachine" v-show="unLocked">
                <button class="link button button-vitality">進入儲藏室</button>
            </RouterLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
.content-box {
    width: 100%;
    height: 500px;
    background: url('../assets/images/item/door_front.webp') no-repeat center;
    background-size: 40%;

    @media screen and (max-width: 767px) {
        height: 600px;
        background-size: 120%;
    }

    .flex-list {
        padding-top: 100px;
        width: 250px;

        @media screen and (max-width: 767px) {
            padding-top: 130px;
        }

        .tiny-note {
            cursor: pointer;
            width: 40px;
            height: 50px;
            font-size: 11px;
            text-align: center;
            color: gray;
            border: 1px solid gray;
            box-shadow: -2px 5px 5px rgba(0, 0, 0, .3);

            &:hover {
                border: 2px solid gray;
            }

        }
    }

    .note {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px;
        padding: 20px;
        width: 200px;
        height: 280px;
        border: var(--border-size) solid gray;
    }

    .closeup {
        position: relative;
        margin: 80px 45%;
        width: 300px;
        height: 150px;
        background: white url('../assets/images/item/lock_closeup.webp') no-repeat 0 -120px;
        background-size: 100%;
        border: var(--border-size) solid gray;
        border-radius: var(--border-roundness);

        @media screen and (max-width: 767px) {
            margin: 100px 35%;
            width: 200px;
            background: white url('../assets/images/item/lock_closeup.webp') no-repeat 0 -50px;
            background-size: 100%;
        }

        .horn {
            position: absolute;
            top: 70px;
            left: -17px;
            width: 30px;
            height: 30px;
            background-color: white;
            border: var(--border-size) solid gray;
            border-top: 0;
            border-right: 0;
            transform: rotate(45deg);
        }

        .great {
            position: absolute;
            top: 60px;
            left: 113px;
            font-size: 4px;

            @media screen and (max-width: 767px) {
                top: 70px;
                left: 72px;
            }
        }

        .exclamation {
            position: absolute;
            top: 58px;
            right: 118px;
            font-size: x-small;

            @media screen and (max-width: 767px) {
                top: 64px;
                right: 78px;
            }
        }

        .greater {
            transition: 1s;
            position: absolute;
            top: 15px;
            left: 100px;
            font-size: larger;

            @media screen and (max-width: 767px) {
                top: 33px;
                left: 60px;
            }
        }

        .greater-mark {
            transition: 1s;
            position: absolute;
            top: 53px;
            right: 80px;
            font-size: larger;

            @media screen and (max-width: 767px) {
                top: 58px;
                right: 54px;
            }
        }

        .password-list {
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            position: absolute;
            top: 45px;
            left: 100px;
            width: 95px;
            height: 40px;
            border: 1px solid black;

            @media screen and (max-width: 767px) {
                top: 60px;
                left: 65px;
                width: 65px;
                height: 25px;
            }

            .password {
                width: 20px;
                text-align: center;
                border: 1px solid black;

                @media screen and (max-width: 767px) {
                    width: 16px;
                    height: 20px;
                }
            }

            .reverse {
                transition: 1s;
                transform: scaleY(-1);
            }

        }

        .link {
            position: absolute;
            bottom: 0;
            right: 70px;
        }
    }
}
</style>