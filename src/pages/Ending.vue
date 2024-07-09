<script setup lang="ts">

// 做好之後再加上來
const link = '#';
</script>

<template>
    <div class="container">
        <div class="message-box">
            <div class="horn"></div>
            我們終於找到文件啦！真的非常感謝您～<br>
            如果這份文件能幫到組織就好了！
        </div>
        <div class="guide-wrapper">
            <img src="../assets/images/guide/holding_site.png" class="guide">
            <a :href="link" class="that-file button button-plain">文件連結</a>
        </div>
    </div>
</template>

<style scoped lang="scss">
.container {
    .message-box {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 400px;
        height: 120px;

        @media screen and (max-width: 767px) {
            width: 80%;
            height: 150px;
        }

        .horn {
            position: absolute;
            top: 102px;
            left: 200px;
            width: 30px;
            height: 30px;
            background-color: var(--msg-background);
            border: var(--border-size) solid var(--msg-border);
            border-top: 0;
            border-right: 0;
            transform: rotate(-45deg);

            @media screen and (max-width: 767px) {
                top: 132px;
                left: 100px;
            }
        }
    }

    .guide-wrapper {
        position: relative;

        .guide {
            width: 400px;

            @media screen and (max-width: 767px) {
                width: 300px;
            }
        }

        .that-file {
            position: absolute;
            top: 160px;
            left: 30%;
            width: 40%;

            @media screen and (max-width: 767px) {
                top: 110px;
            }
        }
    }

}
</style>