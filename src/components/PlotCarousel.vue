<script setup lang="ts">
import { ref } from 'vue';

interface Iplot {
    img: string,
    speech: string
};

const prop = defineProps<{
    srcs: Iplot[]
}>();

const showContainer = defineModel();

const index = ref(0);
const finalIndex = prop.srcs?.length - 1;

const turnLeft = () => {
    if (index.value > 0) index.value--;
};

const turnRight = () => {
    if (index.value < finalIndex) index.value++;
};

</script>

<template>
    <div class="wrapper">
        <img :src="prop.srcs[index]?.img" class="actor">
        <p class="speech message-box">
            {{ prop.srcs[index]?.speech }}
        </p>
        <button @click="turnLeft" class="arrow leftArrow button button-vitality" :class="{ 'button-disabled': index <= 0 }">
            &lt
        </button>
        <button @click="turnRight" class="arrow rightArrow button button-vitality"
            :class="{ 'button-disabled': index >= finalIndex }">
            &gt
        </button>
        <button v-if="index >= finalIndex" @click="showContainer = false" class="ending-button button button-vitality">
            <slot name="endingButton"></slot>
        </button>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    position: relative;
    margin: 20px;
    margin-top: 0;
    padding: 40px;
    max-width: 100%;
    height: 450px;

    @media screen and (max-width: 767px) {
        margin: 0;
    }

    .actor {
        width: 400px;
        max-width: 100%;

        @media screen and (max-width: 767px) {
            width: 300px;
        }
    }

    .speech {
        position: absolute;
        left: 5%;
        bottom: 40px;
        width: 90%;
    }

    .arrow {
        position: absolute;
        top: 200px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    .leftArrow {
        left: 0;
    }

    .rightArrow {
        right: 0;
    }

    .ending-button {
        position: absolute;
        right: 0;
        bottom: 0;

        @media screen and (max-width: 767px) {
            right: 10px;
            bottom: 10px;
        }
    }
}
</style>