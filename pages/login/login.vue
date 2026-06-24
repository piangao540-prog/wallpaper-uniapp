<template>
	<view class="loginLayout">
		<view class="logo">AI壁纸</view>

		<view class="tabs">
			<text :class="['tab', tab === 'login' && 'active']" @click="tab='login'">登录</text>
			<text :class="['tab', tab === 'register' && 'active']" @click="tab='register'">注册</text>
		</view>

		<view class="form">
			<input v-model="username" placeholder="用户名" class="input" />
			<input v-model="password" type="password" placeholder="密码" class="input" />
			<button class="btn" @click="handleSubmit">{{ tab === 'login' ? '登录' : '注册' }}</button>
		</view>
	</view>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {login, register} from '@/api/user'
const tab = ref('login')
const username = ref<string>('')
const password = ref<string>('')

const handleSubmit = async () => {
	if(!username.value || !password.value) return uni.showToast({title:'请填写完整',icon:'none'})
	try{
		if(tab.value === 'login'){
			const res = await login({username:username.value,password:password.value})
			uni.setStorageSync('token',res.token)
			uni.setStorageSync('user',res.user)
			uni.showToast({title:'登录成功',icon:'success'})
		}else{
			await register({username:username.value,password:password.value})
			uni.showToast({title:'注册成功',icon:'success'})
		}
	}catch (err: any) {
    	uni.showToast({title: err?.data?.error || '操作失败', icon: 'none'})
	}
}
</script>

<style>
page{background:#f8f8f8}
.loginLayout{
	padding: 120rpx 50rpx 0;
}
.logo{
	text-align:center;
	font-size:56rpx;
	font-weight:600;
	color:#28b389;
	margin-bottom:80rpx;
}
.tabs{
	display:flex;
	justify-content:center;
	margin-bottom:60rpx;
}
.tab{
	font-size:32rpx;
	color:#999;
	padding:0 40rpx 20rpx;
	margin:0 20rpx;
	border-bottom:4rpx solid transparent;
}
.tab.active{
	color:#28b389;
	border-bottom-color:#28b389;
	font-weight:600;
}

.input{
	width:100%;
	height:90rpx;
	background:#fff;
	border-radius:12rpx;
	padding:0 30rpx;
	margin-bottom:30rpx;
	font-size:28rpx;
	box-sizing:border-box;
	border:1rpx solid #eee;
}
.btn{
	width:100%;
	height:90rpx;
	background:linear-gradient(135deg,#28b389,#1a8a6a);
	color:#fff;
	border-radius:90rpx;
	font-size:32rpx;
	font-weight:500;
	margin-top:20rpx;
	line-height:90rpx;
	text-align:center;
	border:none;
}

</style>
