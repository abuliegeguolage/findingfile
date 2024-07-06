<script setup lang="ts">
const showPopup = defineModel();
const prop = defineProps<{
    msgMode?: {
        type: boolean,
        default: false
    }
}>();
</script>

<template>
    <div v-if="showPopup" @click="showPopup = false" class="mask">
        <div @click.stop class="box">
            <div class="tab">
                <div @click="showPopup = false" class="close button button-plain">╳</div>
                <hr v-if="prop.msgMode" class="line">
            </div>

            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.mask {
    z-index: 1;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 100vw;
    min-height: 100vh;
    background-color: var(--glass);

    .box {
        padding: 5px;
        min-width: 300px;
        min-height: 400px;
        background-color: white;
        border: var(--border-size) solid gray;
        border-radius: var(--border-roundness);

        .tab {
            display: flex;
            flex-direction: column;
            align-items: flex-end;

            .close {
                width: 40px;
                height: 40px;
                line-height: 20px;
                border: unset;
            }
        }

    }
}
</style>