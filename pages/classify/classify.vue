<template>
    <view class="classifyLayout" :style="{ paddingTop: navBarH + 'px' }">
        <custom-nav-bar title="分类" bgColor="#fff" fontColor="#333"></custom-nav-bar>
        <view class="classify">
            <theme-item
                v-for="cat in categoryList" :key="cat.category"
                :image="cat.cover" :name="cat.category" :tag="cat.count + '张'"
                :url="'/pages/classList/classList?category=' + encodeURIComponent(cat.category)"
            ></theme-item>
        </view>
    </view>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import { useNavBar } from '@/composables/useNavBar'
import { getCategories, Category } from '@/api/wallpaper'

const categoryList = ref<Category[]>([])
const {navBarH} = useNavBar()

onMounted(async() => {
    categoryList.value = await getCategories()
})
</script>

<style lang="scss" scoped>
.classifyLayout{
    padding: 30rpx;
    .classify{
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 15rpx;
    }
}
</style>