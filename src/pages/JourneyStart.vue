<script setup lang="ts">

import { ref } from 'vue';
import PopupBox from '../components/PopupBox.vue';
import PlotCarousel from '../components/PlotCarousel.vue';

const showPopup = ref(false);

const carouselSrc = [
    {
        img: '/src/assets/images/guide/ask.png',
        speech: '您就是組織派來接收機密文件的人嗎？可是這裡什麼都沒有……'
    },
    {
        img: '/src/assets/images/guide/invite.png',
        speech: '我們要的文件被藏到其他地方了，一起去找找吧！'
    }
];

</script>

<template>
    <div class="hint-text middle">點擊↓</div>
    <img @click="showPopup = true" class="button guide middle" src="../assets/images/guide/thinking.png">
    <PopupBox v-model="showPopup">
        <PlotCarousel :srcs="carouselSrc">
            <template #endingButton>
                <RouterLink to="/boilingbutton">
                    <button class="link-button button button-vitality">沒問題</button>
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
        margin-top: 30vh;
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

.link-button {
    position: absolute;
    right: 0;
    bottom: 0;

    @media screen and (max-width: 767px) {
        right: 10px;
        bottom: 10px;
    }
}
</style>