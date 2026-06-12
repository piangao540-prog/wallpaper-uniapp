<template>
    <view class="classifyLayout">
        <view class="classify">
            <theme-item v-for="item in 9"></theme-item>
        </view>
    </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.classifyLayout{
    padding: 30rpx;
    .classify{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 15rpx;
    }
}
</style>