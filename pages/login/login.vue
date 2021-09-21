<template>
	<view>
		<view class="flex align-center justify-center" style="height: 350rpx;">
			<text style="font-size: 50rpx;">YOU-LOGO</text>
		</view>
		<view class="px-3">
			<input type="text" v-model="form.username" class="bg-light px-3 mb-3 font" placeholder="请输入用户名" style="height: 100rpx;"/>
			<input type="text" v-model="form.password" class="bg-light px-3 mb-3 font" placeholder="请输入密码" style="height: 100rpx;"/>
			<input v-if="type != 'login'" type="text" v-model="form.repassword" class="bg-light px-3 mb-3 font" placeholder="请输入确认密码" style="height: 100rpx;"/>
		</view>
		
		<view class="p-3 flex align-center justify-center">
			<view class="bg-main rounded p-3 flex align-center justify-center flex-1 " hover-class="bg-main-hover" @click="submit">
				<text class="text-white font-md">{{ type === 'login'?'登 录' : '注 册' }}</text>
			</view>
		</view>
		
		<view class="flex align-center justify-center">
			<text class="text-light-muted font p-2" @click="changeType">{{ type === 'login'?'注册账号' : '去登录' }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type: 'login',
				form: {}
			}
		},
		created() {
			let token = uni.getStorageSync('token')
			if(!token){
				// 用户未登录
				uni.showToast({
					title: '请先登录',
					icon: 'none'
				});
				return this.showLoading = false
			}
			// 用户已登录
			uni.switchTab({
				url:"../index/index"
			})
		},
		methods: {
			changeType(){
				this.type = this.type === 'login' ? 'reg' : 'login'
			},
			submit(){
				this.$H.post("/"+ this.type, this.form).then(res => {
					uni.showToast({
						title:this.type + '成功',
						icon:"none"
					})
					if(this.type === "reg"){
						this.changeType();
						this.form = {}
					} else {
						this.$store.dispatch('login', res)
						uni.switchTab({
							url:"../index/index"
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
