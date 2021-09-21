<template>
	<view>
		<view v-if="!user" class="flex align-center">
			<view class="flex align-center justify-center"
			style="width: 180rpx;height: 180rpx;">
				<image src="/static/avatar.png" class="rounded-circle" style="width: 105rpx;height: 105rpx;"></image>
			</view>
			<view class="flex flex-column">
				<text class="font-md">未登录</text>
				<text class="font text-muted">登录体验更多功能</text>
			</view>
			<view class="ml-auto mr-3">
				<view class="border border-main rounded flex align-center justify-center p-2" hover-class="bg-light" @click="openLogin">
					<text class="text-main font">立即登录</text>
				</view>
			</view>
		</view>
		<view v-else class="flex align-center">
			<view class="flex align-center justify-center"
			style="width: 180rpx;height: 180rpx;">
				<image :src="user.avatar || '/static/avatar.png'" class="rounded-circle" style="width: 105rpx;height: 105rpx;"></image>
			</view>
			<view class="flex flex-column">
				<text class="font-md">{{ user.username }}</text>
				<!-- <text class="font text-muted"></text> -->
			</view>
			<view class="ml-auto mr-3">
				<view class="border border-main rounded flex align-center justify-center p-2" hover-class="bg-light" @click="authJump({ url:`/pages/editUser/editUser?user=${encodeURIComponent(JSON.stringify(user))}` })">
					<text class="text-main font">编辑资料</text>
				</view>
			</view>
		</view>
		
		<view class="f-divider"></view>
		<f-list-item icon="iconfaxian" title="我的金币" :showRight="false"  @click="authJump({ url:'/pages/coin/coin' })">
			<text class="text-muted font">{{ user ? user.coin : 0 }}金币 立即充值</text>
		</f-list-item>
		<f-list-item icon="iconfaxian" title="我的直播" @click="authJump({ url:'/pages/myLive/myLive' })"></f-list-item>
		<f-list-item icon="iconfaxian" title="我的关注" @click="authJump({ url:'/pages/follow/follow' })"></f-list-item>
		<f-list-item icon="iconfaxian" title="历史记录"  @click="authJump({ url:'/pages/history/history' })"></f-list-item>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	import fListItem from '@/components/common/f-list-item.vue';
	import $C from '../../common/config.js'
	export default {
		components: {
			fListItem
		},
		computed:{
			...mapState({
				user: state => state.user
			})
		},
		onShow(){
			this.$store.dispatch('getUserInfo')
		},
		onNavigationBarButtonTap() {
			this.authJump({
				url: '../user-set/user-set'
			})
		},
		mounted() {
			console.log(this.user);
		},
		methods: {
			openLogin(){
				uni.navigateTo({
					url:"../login/login"
				})
			}
		}
	}
</script>

<style>

</style>
