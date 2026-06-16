<template>
	<view class="themeItem">
		<navigator :url="url" class="box" v-if="!isMore">
			<image class="pic" :src="image" mode="aspectFill"></image>
			<view class="mask">{{ name }}</view>
			<view class="tag" v-if="tag">{{ tag }}</view>
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
	isMore: { type: Boolean, default: false },
	image: { type: String, default: '@/common/images/classify1.jpg' },
	name: { type: String, default: '美女' },
	tag: { type: String, default: '' },
	url: { type: String, default: '/pages/classList/classList' }
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
