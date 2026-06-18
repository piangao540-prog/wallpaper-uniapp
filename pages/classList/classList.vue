<template>
	<view class="classList">
		<view  class="content">
			<navigator  class="item" v-for="item in wallpaperList" :url="'/pages/perview/perview?id=' + item.id">
				<image :src="item.url" mode="aspectFill"></image>
			</navigator>
		</view>
	</view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
// @ts-ignore
import {onLoad} from '@dcloudio/uni-app'
import { getByCategory, Wallpaper} from '@/api/wallpaper'

const wallpaperList = ref<Wallpaper[]>([])
const query = ref('')

onLoad(async (e:any) => {
	query.value = decodeURIComponent(e?.category || '')
	wallpaperList.value = await getByCategory(query.value)
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
</style>
