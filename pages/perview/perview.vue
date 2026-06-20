<template>
	<view class="preview">
		<swiper circular :current="currentIndex" @change="onSwiperChange">
			<swiper-item v-for="item in wallpaperList">
				<image @click="maskChang" :src="item.url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<!-- 遮罩层 -->
		<view class="mask" v-if="maskState" @click="maskChang">
			<view class="top">
				<view class="goBack" @click="gotoBack">
					<uni-icons type="back" size="28" color="#fff"></uni-icons>
				</view>
				<view class="count">{{ currentIndex + 1}} / {{ wallpaperList.length }}</view>
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
					<uni-icons type="info" size="25" color="#fff"></uni-icons>
					<view class="text">信息</view>
				</view>
				<view class="box" @click.stop="toggleFavorite">
					<uni-icons :type="isFavorited ? 'star-filled' : 'star'" size="25" :color="isFavorited ? '#f5c842' : '#fff'"></uni-icons>
					<view class="text">收藏</view>
				</view>
				<view class="box">
					<uni-icons type="download" size="25" color="#fff"></uni-icons>
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
							<text selectable class="value">{{ wallpaperList[currentIndex]?.id }}</text>
						</view>
						<view class="row">
							<view class="label">分类:</view>
							<text selectable class="value">{{ wallpaperList[currentIndex].category }}</text>
						</view>
						<view class="row">
							<view class="label">作者:</view>
							<text selectable class="value">{{ wallpaperList[currentIndex].author }}</text>
						</view>
						<view class="row">
							<view class="label">标签:</view>
							<view class="value tabs">
								<view class="tab" v-for="item in (wallpaperList[currentIndex]?.tags || '').split(',')">{{ item }}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
// @ts-ignore 
import {onLoad} from '@dcloudio/uni-app'
import { getById, getWallpapers, getByCategory} from '@/api/wallpaper'
import type { Wallpaper } from '@/api/wallpaper'

const maskState = ref<any>(true)
const popup = ref<any>(null)
const isFavorited = ref(false)
const wallpaperList = ref<Wallpaper[]>([])
const currentIndex = ref(0)

// 获取壁纸数据
onLoad(async (e: any) => {
    if (e?.id) {
		if(e?.category){
			wallpaperList.value = await getByCategory(e.category)
		}else{
			wallpaperList.value =  await getWallpapers()
		}
		currentIndex.value = wallpaperList.value.findIndex(a => a.id === Number(e.id))
    }
})

const onSwiperChange = (e:any) => {
	currentIndex.value = e.detail.current
}

// 信息弹窗
const openInfo = () => popup.value.open()
const closeInfo = () => popup.value.close()

// 收藏
const toggleFavorite = () => {
	isFavorited.value = !isFavorited.value
	uni.showToast({
		title: isFavorited.value ? '已收藏' : '已取消收藏',
		icon: 'none'
	})
}

// 遮罩切换
const maskChang = () => {
	maskState.value = !maskState.value
}

// 返回
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
}
</style>
