<template>
	<view class="userLayout pageBg" :style="{ paddingTop: navBarH + 'px' }">
		<custom-nav-bar title="个人中心" bgColor="#fff" fontColor="#333"></custom-nav-bar>
		<view class="userInfo">
			<view class="avatar">
				<image src="@/static/images/xxmLogo.png" mode="aspectFill"></image>
			</view>
			<view class="ip">100.100.110.100</view>
			<view class="address">来自于：山东</view>
		</view>
		<view class="selection">
			<view class="list">
				<view class="row" v-for="item in topList" :key="item.text" :url="item.page" @click="goPage(item.page)">
					<view class="left">
						<uni-icons :type="item.icon" size="28"></uni-icons>
						<view class="text">{{ item.text }}</view>
					</view>
					<view class="right">
						<view class="text">{{ item.value }}</view>
						<uni-icons type="forward" size="20" color="#aaa"></uni-icons>
					</view>
				</view>
				<view class="row">
					<view class="left">
						<uni-icons type="chatboxes" size="28"></uni-icons>
						<view class="text">我的客服</view>
					</view>
					<view class="right">
						<uni-icons type="forward" size="20" color="#aaa"></uni-icons>
					</view>
					<!-- #ifdef MP-->
					<button open-type="contact" class="contact-btn">联系客服</button>
					<!-- #endif -->
					<!-- #ifdef H5-->
					<button class="contact-btn" @click="phone">拨打电话</button>
					<!-- #endif -->
				</view>
			</view>
		</view>
		<view class="selection">
			<view class="list">
				<view class="row" v-for="item in latterList" :key="item.text">
					<view class="left">
						<uni-icons :type="item.icon" size="28"></uni-icons>
						<view class="text">{{item.text}}</view>
					</view>
					<view class="right">
						<view class="text">{{ item.value }}</view>
						<uni-icons type="forward" size="20" color="#aaa"></uni-icons>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import {ref} from 'vue'
import { useNavBar } from '@/composables/useNavBar'
const topList = ref([
  { icon: 'upload', text: '我的下载', value: '334',page: '/pages/classList/classList' },
  { icon: 'star',   text: '我的收藏', value: '128',page: '/pages/classList/classList' },
  { icon: 'chatbubble',   text: '我的评论', value: '128' },
])

const latterList = ref([
  { icon: 'notification', text: '订阅更新', value: '334' },
  { icon: 'flag',   text: '常见问题', value: '128' },
])

const phone = () => {
	uni.makePhoneCall({
	phoneNumber: '114'
})
}

const goPage = (url) => {
	if (url) uni.navigateTo({url})
}

// 标题距离计算
const {navBarH} = useNavBar()
</script>

<style lang="scss" scoped>
.userLayout{
	.userInfo{
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 60rpx 0;
	}
	.avatar{
		width: 160rpx;
		height: 160rpx;
		border-radius: 50%;
		overflow: hidden;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.ip{
		color: #333;
		font-size: 44rpx;
		padding: 20rpx 0 5rpx;
	}
	.address{
		color: #aaa;
		font-size: 28rpx;
	}
	.selection{
		width: 690rpx;
		margin: 50rpx auto;
		border: 1px solid #eee;
		border-radius: 10rpx;
		box-shadow: 0 0 30rpx rgba(0,0,0,0.07);
		.list{
			.row{
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 100rpx;
				padding: 26rpx 30rpx;
				border-bottom: 1px solid #eee;
				position: relative;
				.left{
					display: flex;
					justify-content: center;
					align-items: center;
					:deep(){
						.uni-icons{
							color: $brand-theme-color !important;
						}
					}
					.text{
						padding-left: 20rpx;
						color: #aaa;
					}
					
				}
				.right{
					display: flex;
					justify-content: center;
					align-items: center;
					.text{
						padding-right: 10rpx;
						font-size: 28rpx;
						color: #aaa;
					}
				}
			}
			.row:last-child{
				border-bottom: none;
			}
			.contact-btn{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				opacity: 0;
				border: none;
			}
		}
	}
}
</style>
