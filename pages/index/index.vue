<template>
	<view class="homeLayout pageBg" :style="{ paddingTop: navBarH + 'px' }">
		<custom-nav-bar title="AI壁纸" bgColor="#fff" fontColor="#333"></custom-nav-bar>
		<view class="banner">
			<swiper indicator-dots indicator-color="rgba(242, 233, 220, 0.63)"
			indicator-active-color="#fff" autoplay interval="3000">
				<swiper-item v-for="item in bannerList">
					<image :src="item.url" mode="aspectFill"></image>
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
					<swiper-item v-for="item in 3">图片素材来自pixiv(有作者)和wallhaven(未知)</swiper-item>
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
				<view class="box" v-for="item in latestWallpaper.slice(0,6)" @click="gotoPerview(item.id)">
					<image :src="item.url" mode="aspectFill" :style="{ width: '100%', height: '100%' }"></image>
				</view>
			</scroll-view>
		</view>
		<view class="theme">
			<common-title>
				<template #name>专题精选</template>
				<template #custom>
					<navigator url="/pages/classify/classify" open-type="switchTab">More+</navigator>
				</template>
			</common-title>
			<view class="content">
				<navigator class="itemBox" v-for="item in wallpaperList.slice(0, 8)" :key="item.id" :url="'/pages/perview/perview?category=' + item.category + '&id=' + item.id">
					<image :src="item.url" mode="aspectFill"></image>
					<view class="tag">{{ item.category }}</view>
				</navigator>
				<navigator class="itemBox more" url="/pages/classify/classify" open-type="switchTab">
					<image class="pic" src="@/common/images/more.jpg" mode="aspectFill"></image>
					<view class="moreMask">
						<uni-icons type="more" size="30" color="#fff"></uni-icons>
						<view class="moreText">更多</view>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import {ref, onMounted} from 'vue'
import {useNavBar} from '@/composables/useNavBar'
import {getWallpapers, Wallpaper, getLatest, getByCategory} from '@/api/wallpaper'

const latestWallpaper = ref<Wallpaper[]>([])
const bannerList = ref<Wallpaper[]>([])
const wallpaperList = ref<Wallpaper[]>([])

const {navBarH} = useNavBar()
const gotoPerview = (id: number) => {
	uni.navigateTo({ url: `/pages/perview/perview?id=${id}` })
}

onMounted(async() => {
	latestWallpaper.value = await getLatest()
	bannerList.value = await getByCategory('Yoneyama Mai')
	const all = await getWallpapers()
	const seen = new Set()
	wallpaperList.value = all.filter(item => {
		if (seen.has(item.category)) return false
		seen.add(item.category)
		return true
	})
})
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
			.itemBox{
				height: 340rpx;
				border-radius: 10rpx;
				overflow: hidden;
				position: relative;
				image{
					width: 100%;
					height: 100%;
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
					font-size: 22rpx;
					transform: scale(0.8);
					transform-origin: left top;
				}
				.moreMask{
					width: 100%;
					height: 100%;
					background: rgba(0,0,0,0.15);
					backdrop-filter: blur(20rpx);
					-webkit-backdrop-filter: blur(20rpx);
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					position: relative;
					z-index: 1;
					.moreText{
						color: #fff;
						font-size: 28rpx;
						margin-top: 10rpx;
					}
				}
			}
			.itemBox.more{
				overflow: hidden;
				.pic{
					width: 100%;
					height: 100%;
					position: absolute;
				}
			}
		}
	}
}
</style>
