<template>
	<view class="">
		<view v-for="item in list">
			<view class="flex justify-between align-center px-2"  hover-class="bg-light">
				<view class="flex justify-between align-center">
					<image class="rounded-circle mr-1" style="width: 100rpx; height: 100rpx;" :src="item.follow_user.avatar||'/static/avatar.png'" mode=""></image>
					<text>{{item.follow_user.username}}</text>
				</view>
				<view class="px-2 py-1 bg-secondary">
					<text>已关注</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				list: []
			}
		},
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				this.$H.get('/user/followList/'+this.page, {token: true}).then(res => {
					console.log(res);
					this.list = this.page === 1 ? res:[...this.list, ...res];
					// this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多'
				}).catch(err=>{
					console.log(err);
				})
			}
		}
	}
</script>

<style>

</style>
