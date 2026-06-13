<template>
	<view class="homeLayout pageBg" :style="{ paddingTop: navBarH + 'px' }">
		<custom-nav-bar title="AI壁纸" bgColor="#fff" fontColor="#333"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(242, 233, 220, 0.63)"
			indicator-active-color="#fff" autoplay interval="3000">
				<swiper-item v-for="item in 3">
					<image src="/common/images/banner1.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="notice">
			<view class="left">
				<uni-icons type="sound" size="20"></uni-icons>
				<text>公告</text>
			</view>
			<view class="continer">
				<swiper vertical interval="1500" duration="300" autoplay circular>
					<swiper-item v-for="item in 3"> 公告内容。。。好啊好好啊好号好啊后好好</swiper-item>
				</swiper>
			</view>
			<view class="right">
				<uni-icons type="forward" size="20"></uni-icons>
			</view>
		</view>
		<view class="select">
			<common-title>
				<template #name>每日推荐</template>
				<template #custom>
					<view class="data">
						<uni-icons type="calendar" size="18" color></uni-icons>
						<view class="text">
							<uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
						</view>
					</view>
				</template>
			</common-title>
			<scroll-view scroll-x class="scroll-x">
				<view class="box" v-for="item in 8">
					<image src="/common/images/preview_small.webp"></image>
				</view>
			</scroll-view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<theme-item v-for="item in 8" ></theme-item>
				<theme-item :isMore="true" ></theme-item>
			</view>
		</view>
	</view>
</template>

<script setup>
// import {ref, onMounted} from "vue"
import {useNavBar} from '@/composables/useNavBar'

const {navBarH} = useNavBar()


// onMounted(() => {
// 	const info = uni.getSystemInfoSync()
// 	navBarH.value = (info.statusBarHeight || 20) + 44
// })
</script>

<style lang="scss" scoped>
.homeLayout{
	.banner{
		width:750rpx;
		padding: 30rpx 0;
		swiper{
			width: 750rpx;
			height: 340rpx;
			swiper-item{
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
					}
			}
		}
	}
	.notice{
		width: 690rpx;
		height: 80rpx;
		line-height: 80rpx;
		background: #f9f9f9;
		margin:0 auto;
		border-radius: 80rpx;
		display: flex;
		.left{
			width: 140rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			:deep(){
				.uni-icons{
					color: $brand-theme-color !important;
				}
			}
			text{
				margin-left: 5rpx;
				color:$brand-theme-color;
				font-weight: 600;
				font-size: 28rpx;
			}
		}
		.continer{
			flex:1;
			swiper{
				height: 100%;
				swiper-item{
					color: #28b389;
					font-size: 30rpx;
					height: 100%;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		.right{
			width: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.select{
		padding: 50rpx;
		.data{
			display: flex;
			align-items: center;
			.text{
				margin-left: 5rpx;
			}
		}
		.scroll-x{
			white-space: nowrap;
			.box{
				width: 200rpx;
        		height: 430rpx;
				margin-right: 15rpx;
        		display: inline-block;
				image{
					width: 100%;
					height: 100%;
					border-radius: 10rpx;
				}
			}
			.box:last-child{margin-right: 0rpx;}
			
		}
	}
	.theme{
		padding: 25rpx 50rpx;
		.content{
			display: grid;
			gap: 15rpx;
			grid-template-columns: repeat(3,1fr);
		}
	}
}
</style>
