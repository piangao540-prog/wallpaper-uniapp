<template>
    <view class="classifyLayout" :style="{ paddingTop: navBarH + 'px' }">
        <custom-nav-bar title="分类" bgColor="#fff" fontColor="#333"></custom-nav-bar>
        <view class="classify">
            <theme-item v-for="item in 9"></theme-item>
        </view>
    </view>
</template>

<script setup>
import { useNavBar } from '@/composables/useNavBar'
const {navBarH} = useNavBar()
</script>

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