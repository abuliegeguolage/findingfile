<script setup lang="ts">

import { ref } from 'vue';
import PopupBox from '../components/PopupBox.vue';
import PlotCarousel from '../components/PlotCarousel.vue';

import illustration1 from '/src/assets/images/guide/ask.webp';
import illustration2 from '/src/assets/images/guide/invite.webp';

const showPopup = ref(false);

const carouselSrc = [
    {
        img: illustration1,
        speech: '您就是組織派來接收機密文件的人嗎？可是這裡什麼都沒有……'
    },
    {
        img: illustration2,
        speech: '我們要的文件被藏到其他地方了，一起去找找吧！'
    }
];

</script>

<template>
    <div class="hint-text middle">點擊↓</div>
    <img @click="showPopup = true" class="button guide middle" src="../assets/images/guide/thinking.webp">
    <PopupBox v-model="showPopup">
        <PlotCarousel :srcs="carouselSrc">
            <template #endingButton>
                <RouterLink to="/boilingbutton">
                    沒問題
                </RouterLink>
            </template>
        </PlotCarousel>
    </PopupBox>
</template>

<style scoped lang="scss">
.hint-text {
    margin-top: 10vh;
    width: 50px;

    @media screen and (max-width: 767px) {
        margin-top: 20vh;
    }
}

.guide {
    display: block;
    width: 300px;
    background-color: unset;
    border: unset;
    box-shadow: unset;

    &:hover {
        filter: drop-shadow(var(--shadow));
    }
}
</style>