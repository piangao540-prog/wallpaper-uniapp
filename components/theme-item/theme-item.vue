<template>
    <view class="themeItem">
        <navigator url="/pages/classList/classList" class="box" v-if="!isMore">
            <image class="pic" src="@/common/images/classify1.jpg"></image>
            <view class="mask">美女</view>
            <view class="tag">三天前</view>
        </navigator>
        <navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-if="isMore">
            <image class="pic" src="@/common/images/more.jpg"></image>
            <view class="mask">
                <uni-icons type="more" size="30"></uni-icons>
                <view class="text">更多</view>
            </view>
        </navigator>
    </view>
</template>

<script setup>
defineProps({
    isMore:{
        typeof:Boolean,
        default: false
    }
})
</script>

<style lang="scss" scoped>
.themeItem{
    .box{
        height: 340rpx;
        border-radius: 10rpx;
        overflow: hidden;
        position: relative;
        .pic{
            width: 100%;
            height: 100%;
        }
        .mask{
            position:absolute;
            width: 100%;
            height: 70rpx;
            bottom: 0;
            left: 0;
            background: rgba(0,0,0,0.2);
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            backdrop-filter: blur(20rpx);
            font-size: 30rpx;
            font-weight: 600;
        }
        .tag{
            position: absolute;
            padding: 4rpx 10rpx;
            left: 0;
            top: 0;
            background: rgba(234, 82, 62, 0.7);
            backdrop-filter: blur(20rpx);
            border-radius: 0 0 20rpx 0;
            color: #fff;
            font-size: 26rpx;
            font-weight: 500;
            transform: scale(0.8);
            transform-origin:left top;
        }
    }
    .box.more{
        .mask{
            width: 100%;
            height: 100%;
            flex-direction: column;
        }
    }
}
</style>