<script setup lang="ts">
import { ref } from 'vue';
import PopupBox from './PopupBox.vue';

const showTransport = ref(false);
const showPlot = defineModel();
const showHint = ref(false);
const prop = defineProps<{
    hint?: string
}>();

</script>

<template>
    <header>
        <div @click="showTransport = true" class="header-button transport">傳送門</div>
        <div @click="showPlot = true" class="header-button review">事件回顧</div>
        <div @click="showHint = true" v-if="prop.hint" class="header-button hint">提示</div>
    </header>
    <PopupBox v-model="showTransport" :msgMode="true">
        <div class="transport-msg-box">
            <RouterLink to="/Ending">
                <button class="button button-vitality">傳送！</button>
            </RouterLink>
            <p>點擊上方按鈕就可以直接傳送到終點囉～</p>
        </div>
    </PopupBox>
    <PopupBox v-model="showHint" :msgMode="true">
        {{ prop.hint }}
    </PopupBox>
</template>

<style scoped lang="scss">
header {
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: fixed;
    top: 0;
    left: 0;
    padding: 0 10vw;
    width: 100%;
    height: 80px;
    background-color: white;
    border-bottom: 1px solid gray;
    box-shadow: var(--shadow);

    @media screen and (max-width: 767px) {
        justify-content: space-between;
        padding: 0 5vw;
    }

    .header-button {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        margin-right: 30px;
        width: 80px;
        height: 70px;
        color: gray;
        background: no-repeat center 25%;
        background-size: 50%;
        border-radius: var(--border-roundness);

        &:hover {
            box-shadow: var(--shadow);
        }

        @media screen and (max-width: 767px) {
            margin-right: unset;
        }
    }

    .transport {
        background-image: url(../assets/images/transport.svg);
    }

    .review {
        background-image: url(../assets/images/review.svg);
    }

    .hint {
        background-image: url(../assets/images/hint.svg);
    }
}

.transport-msg-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    margin: auto;
    width: 76%;
    height: 200px;
}
</style>