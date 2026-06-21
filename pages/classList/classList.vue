<template>
	<view class="classList">
		<view  class="content" v-if="!loading">
			<navigator  class="item" v-for="item in wallpaperList" :url="'/pages/perview/perview?category=' + query + '&id=' + item.id">
				<image :src="item.url" mode="aspectFill"></image>
			</navigator>
		</view>
		<!-- 骨架屏 -->
		<view class="content" v-else>
			<view class="skeleton" v-for="i in 9" :key="i"></view>
		</view>
	</view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
// @ts-ignore
import {onLoad} from '@dcloudio/uni-app'
import { getByCategory, Wallpaper} from '@/api/wallpaper'
// @ts-ignore
import {onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'

const wallpaperList = ref<Wallpaper[]>([])
const query = ref('')
const loading = ref(true)

// 分享好友
onShareAppMessage(() => {
	return {
		title: '这页壁纸好看',
		path: '/pages/classList/classList?category=' + query.value
	}
})

onShareTimeline(() => {
	return {
		title: '这页壁纸好看'
	}
})

onLoad(async (e:any) => {
	query.value = decodeURIComponent(e?.category || '')
	const key = 'classList_' + query.value
	const cached = uni.getStorageSync(key)
	if(cached){
		wallpaperList.value = cached
		loading.value = false
	}else{
		wallpaperList.value = await getByCategory(query.value)
		uni.setStorageSync(key,wallpaperList.value)
		loading.value = false
	}
})
</script>

<style lang="scss" scoped>
.classList{
	.content{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 5rpx;
		padding: 5rpx;
		.item{
			height: 440rpx;
			image{
				width: 100%;
				height: 100%;
				display: block;
			}
		}
	}
}
// 骨架屏
.skeleton{
    height: 440rpx;
    background: linear-gradient(90deg, #e8e8e8 25%, #f2f2f2 50%, #e8e8e8 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4rpx;
}

@keyframes shimmer{
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
}
</style>
