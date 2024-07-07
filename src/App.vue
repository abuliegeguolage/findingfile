<script setup lang="ts">
</script>

<template>
    <main>
        <RouterView />
    </main>
</template>

<style lang="scss" scoped>
main {
    margin: auto;
    width: 80vw;

    @media screen and (max-width: 768px) {
        width: 90vw;
    }
}
</style>
