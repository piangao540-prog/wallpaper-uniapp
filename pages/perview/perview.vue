<template>
	<view class="preview">
		<swiper circular>
			<swiper-item v-for="item in 5">
				<image @click="maskChang" src="@/common/images/preview1.jpg" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 遮罩层 -->
		<view class="mask" v-if="maskState" @click="maskChang">
			<view class="top">
				<view class="goBack" @click="gotoBack">
					<uni-icons type="back" size="28" color="#fff"></uni-icons>
				</view>
				<view class="count">3 / 99</view>
			</view>
			<view class="center">
				<view class="time">
					<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
				</view>
				<view class="data">
					<uni-dateformat :date="new Date()" format="MM月/dd日"></uni-dateformat>
				</view>
			</view>
			<view class="footer" @click.stop>
				<view class="box" @click.stop="openInfo">
					<uni-icons type="info" size="25"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click.stop="openRate">
					<uni-icons type="star" size="25"></uni-icons>
					<view class="text">评分</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="25"></uni-icons>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		<!-- 信息弹窗 -->
		<uni-popup ref="popup" type="bottom">
			<view class="infoPop">
				<view class="popHeader">
					<view></view>
					<view class="title">壁纸信息</view>
					<view class="close" @click="closeInfo">
						<uni-icons type="closeempty" size="18" color="#999"></uni-icons>
					</view>
				</view>
				<scroll-view scroll-y>
					<view class="content">
						<view class="row">
							<view class="label">壁纸ID:</view>
							<text selectable class="value">1235fsdf43</text>
						</view>
						<view class="row">
							<view class="label">分类:</view>
							<text selectable class="value">美女</text>
						</view>
						<view class="row">
							<view class="label">发布者:</view>
							<text selectable class="value">piangao</text>
						</view>
						<view class="row">
							<view class="label">评分:</view>
							<view class="value rateBox">
								<uni-rate readonly touchable="false" value="3"/>
								<text class="score">5分</text>
							</view>
						</view>
						<view class="row">
							<view class="label">标签:</view>
							<view class="value tabs">
								<view class="tab" v-for="item in 4">标签</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<!-- 评分弹窗 -->
		<uni-popup ref="ratePopup" type="center" :is-mask-click="false">
			<view class="ratePop">
				<view class="rateTitle">给壁纸评分</view>
				<uni-rate v-model="rateVal" :size="40" color="#555" active-color="#f5c842" margin="10"/>
				<view class="rateText">{{ rateText }}</view>
				<view class="rateBtn" @click="submitRate">提交评分</view>
				<view class="rateClose" @click="closeRate">
					<uni-icons type="closeempty" size="16" color="#888"></uni-icons>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
import {ref, computed} from 'vue'

const maskState = ref(true)
const popup = ref(null)
const ratePopup = ref(null)
const rateVal = ref(3)

const rateText = computed(() => {
	const map = {1: '非常差', 2: '较差', 3: '一般', 4: '较好', 5: '非常好'}
	return map[rateVal.value] || ''
})

// 信息弹窗
const openInfo = () => popup.value.open()
const closeInfo = () => popup.value.close()

// 评分弹窗
const openRate = () => ratePopup.value.open()
const closeRate = () => ratePopup.value.close()
const submitRate = () => {
	uni.showToast({title: `评分成功：${rateVal.value}分`, icon: 'success'})
	closeRate()
}

// 遮罩切换
const maskChang = () => {
	maskState.value = !maskState.value
}

// 返回按钮
const gotoBack = () =>{
	uni.navigateBack()
}
</script>

<style lang="scss" scoped>
.preview{
	width: 100%;
	height: 100vh;
	position: relative;
	background: #000;
	swiper{
		width: 100%;
		height: 100%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	// 遮罩
	.mask{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.5) 100%);
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 100rpx 0 80rpx;
		// #ifdef H5
		pointer-events: none;
		.top, .center, .footer{
			pointer-events: auto;
		}
		// #endif
		// #ifdef MP
		pointer-events: none;
		.top, .center, .footer{
			pointer-events: auto;
		}
		// #endif
		.top{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 30rpx;
			.goBack{
				width: 60rpx;
				height: 60rpx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.count{
				background: rgba(0,0,0,0.35);
				color: #fff;
				font-size: 26rpx;
				border-radius: 40rpx;
				padding: 8rpx 28rpx;
				backdrop-filter: blur(10rpx);
			}
		}
		.center{
			text-align: center;
			color: #fff;
			.time{
				font-size: 130rpx;
				font-weight: 100;
				line-height: 1em;
				text-shadow: 0 4rpx 20rpx rgba(0,0,0,0.3);
			}
			.data{
				font-size: 32rpx;
				margin-top: 20rpx;
				opacity: 0.85;
				text-shadow: 0 2rpx 10rpx rgba(0,0,0,0.3);
			}
		}
		.footer{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 60vw;
			height: 110rpx;
			margin: 0 auto;
			background: rgba(255,255,255,0.2);
			backdrop-filter: blur(30rpx);
			border-radius: 110rpx;
			border: 1px solid rgba(255,255,255,0.15);
			.box{
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 0 20rpx;
				opacity: 0.9;
				.text{
					font-size: 22rpx;
					color: rgba(255,255,255,0.85);
					margin-top: 6rpx;
				}
			}
		}
	}
	// 信息弹窗
	.infoPop{
		background: #1a1a1a;
		border-radius: 30rpx 30rpx 0 0;
		padding: 30rpx;
		overflow: hidden;
		.popHeader{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-bottom: 20rpx;
			border-bottom: 1px solid #333;
			.title{
				color: #fff;
				font-size: 32rpx;
				font-weight: 500;
			}
			.close{
				padding: 6rpx;
			}
		}
		scroll-view{
			min-height: 40vh;
			max-height: 60vh;
			.content{
				padding-top: 10rpx;
				.row{
					display: flex;
					align-items: flex-start;
					padding: 22rpx 0;
					border-bottom: 1px solid #2a2a2a;
					.label{
						color: #888;
						width: 140rpx;
						text-align: right;
						font-size: 28rpx;
						flex-shrink: 0;
					}
					.value{
						flex: 1;
						width: 0;
						padding-left: 20rpx;
						color: #ccc;
						font-size: 28rpx;
					}
					.rateBox{
						display: flex;
						align-items: center;
						.score{
							padding-left: 10rpx;
							color: #999;
							font-size: 26rpx;
						}
					}
					.tabs{
						display: flex;
						flex-wrap: wrap;
						.tab{
							background: rgba(255,255,255,0.08);
							border: 1px solid rgba(255,255,255,0.12);
							border-radius: 30rpx;
							padding: 6rpx 22rpx;
							font-size: 22rpx;
							color: #ddd;
							margin: 4rpx 10rpx 4rpx 0;
						}
					}
				}
				.row:last-child{
					border-bottom: none;
				}
			}
		}
	}
	// 评分弹窗
	.ratePop{
		background: #1a1a1a;
		border-radius: 24rpx;
		padding: 50rpx 60rpx;
		text-align: center;
		position: relative;
		.rateTitle{
			color: #fff;
			font-size: 34rpx;
			font-weight: 600;
			margin-bottom: 40rpx;
		}
		.rateText{
			color: #f5c842;
			font-size: 28rpx;
			margin-top: 24rpx;
			min-height: 40rpx;
		}
		.rateBtn{
			background: linear-gradient(135deg, #28b389, #1a8a6a);
			color: #fff;
			font-size: 30rpx;
			padding: 20rpx 0;
			border-radius: 50rpx;
			margin-top: 36rpx;
			font-weight: 500;
		}
		.rateClose{
			position: absolute;
			top: 20rpx;
			right: 24rpx;
			padding: 10rpx;
		}
	}
}
</style>
