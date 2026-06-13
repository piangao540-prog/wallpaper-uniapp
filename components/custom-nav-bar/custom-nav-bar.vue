<template>
	<view class="navBar" :style="{ background: bgColor }">
		<!-- 状态栏占位 -->
		<view class="statusBar" :style="{ height: statusBarHeight + 'px' }"></view>
		<!-- 导航栏内容 -->
		<view class="navContent" :style="{ height: navHeight + 'px' }">
			<view class="left" @click="handleLeft">
				<slot name="left">
					<uni-icons v-if="showBack" type="arrowleft" size="22" :color="fontColor"></uni-icons>
				</slot>
			</view>
			<view class="center">
				<slot name="center">
					<text class="title" :style="{ color: fontColor, fontSize: titleSize + 'rpx' }">{{ title }}</text>
				</slot>
			</view>
			<view class="right">
				<slot name="right"></slot>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
	title: { type: String, default: '' },
	bgColor: { type: String, default: 'transparent' },
	fontColor: { type: String, default: '#fff' },
	titleSize: { type: Number, default: 32 },
	showBack: { type: Boolean, default: false },
	navHeight: { type: Number, default: 44 }
})

const emit = defineEmits(['back'])
const statusBarHeight = ref(20)

onMounted(() => {
	// #ifdef MP-WEIXIN
	statusBarHeight.value = uni.getSystemInfoSync().statusBarHeight
	// #endif
	// #ifdef H5
	statusBarHeight.value = 0
	// #endif
})

const handleLeft = () => {
	if (props.showBack) emit('back')
}
</script>

<style lang="scss" scoped>
.navBar{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
	.statusBar{
		width: 100%;
	}
	.navContent{
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		.left{
			width: 100rpx;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
		.center{
			flex: 1;
			text-align: center;
			.title{
				font-weight: 500;
			}
		}
		.right{
			width: 100rpx;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
}
</style>
