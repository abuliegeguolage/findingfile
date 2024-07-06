<script setup lang="ts">
import { ref } from 'vue';

interface Iplot {
    img: string,
    speech: string
};

const prop = defineProps<{
    srcs: Iplot[];
}>();

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
        <p class="speech">
            {{ prop.srcs[index]?.speech }}
        </p>
        <button @click="turnLeft" class="arrow leftArrow button button-vitality" :class="{ 'button-disabled': index <= 0 }">
            &lt
        </button>
        <button @click="turnRight" class="arrow rightArrow button button-vitality"
            :class="{ 'button-disabled': index >= finalIndex }">
            &gt
        </button>
        <slot name="endingButton" v-if="index >= finalIndex" class="endingButton"></slot>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    position: relative;
    margin: 20px;
    margin-top: 0;
    padding: 20px;
    max-width: 100%;
    height: 450px;

    @media screen and (max-width: 767px) {
        margin: 0;
    }

    .actor {
        width: 400px;

        @media screen and (max-width: 767px) {
            width: 300px;
        }
    }

    .speech {
        position: absolute;
        left: 5%;
        bottom: 20px;
        padding: 20px;
        max-width: 90%;
        background-color: rgba(224, 255, 255, .9);
        border: var(--border-size) solid lightblue;
        border-radius: var(--border-roundness);
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
}
</style>