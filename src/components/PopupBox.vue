<script setup lang="ts">
const showPopup = defineModel();
const props = defineProps<{
    msgMode?: boolean,
    noBackBoard?: boolean
}>();
</script>

<template>
    <div v-if="showPopup" @click="showPopup = false" class="mask">
        <div @click.stop class="box" :class="{ 'backboard': !props.noBackBoard }">
            <div class="tab">
                <div @click="showPopup = false" class="close button button-plain">╳</div>
                <hr v-if="props.msgMode" class="line">
            </div>

            <div class="content" :class="{ 'pure-text-only': props.msgMode }">
                <slot></slot>
            </div>
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
        max-width: 90vw;

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

        .content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            min-height: 300px;
        }

        .pure-text-only {
            padding: 20px;
        }

    }

    .backboard {

        background-color: white;
        border: var(--border-size) solid gray;
        border-radius: var(--border-roundness);
    }
}
</style>