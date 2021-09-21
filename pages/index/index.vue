<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<image src="../../static/banner/1.jpg" style="width: 750rpx; height: 250rpx;" ></image>
			</swiper-item>
			<swiper-item>
				<image src="../../static/banner/2.jpg"  style="width: 750rpx; height: 250rpx;"></image>
			</swiper-item>
		</swiper>
		
		<live-list :list="list"></live-list>
		
		<view class="f-divider"></view>
		<view class="flex align-center justify-center py-3">
			<text class="font-md text-secondary">{{ loadText }}</text>
		</view>
	</view>
</template>

<script>
	import liveList from '../../components/live/liveList.vue'
	export default {
		data() {
			return {
				list: [],
				page: 1,
				loadText: ''
			}
		},
		components:{
			liveList
		},
		onLoad() {
			this.getList()
			this.$store.dispatch('connectSocket');
		},
		onPullDownRefresh() {
			this.page = 1
			this.getList().then(() => {
				uni.stopPullDownRefresh();
			})
		},
		onReachBottom(){
			if(this.loadText !== '上拉加载更多'){
				return
			}
			this.loadText = "加载中...."
			this.page++;
			this.getList();
		},
		methods: {
			getList(){
				return this.$H.get('/live/list/'+this.page).then(res => {
					this.list = this.page === 1 ? res:[...this.list, ...res];
					this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多'
				})
			}
		}
	}
</script>

<style>
</style>
