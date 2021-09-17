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
		<view class="list-wrapper flex flex-wrap">
			<view class="item text-white" v-for="item in list" :key="item.id" @click="openLive(item.id)">
				<image class="image rounded" :src="item.cover || '/static/1.jpg'" mode="aspectFill"></image>
				<!-- 金币 -->
				<view class="coin flex align-center rounded-circle px-2">
					<text class="iconfont iconbizhongguanli text-warning mr-1"></text>
					<text>{{item.coin}}</text>
				</view>
				<!-- 人气 -->
				<view class="popularity flex align-center rounded-circle px-2">
					<text class="mr-1">人气：</text>
					<text>{{item.look_count}}</text>
				</view>
				<!-- 直播name -->
				<view class="name flex align-center rounded-circle px-2 py-1">
					<text class="font-sm">{{item.title}}</text>
				</view>
				<!-- 直播状态 -->
				<view class="state flex align-center rounded-circle px-2 py-1">
					<text class="state-icon mr-1"></text>
					<text class="state-text font-sm">{{item.status | formatStatus}}</text>
				</view>
			</view>
		</view>
		<view class="f-divider"></view>
		<view class="flex align-center justify-center py-3">
			<text class="font-md text-secondary">{{ loadText }}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				page: 1,
				loadText: ''
			}
		},
		filters: {
			formatStatus(value) {
				let o = {
					0:"未开始",
					1:"直播中",
					2:"暂停",
					3:"已结束",
				}
				return o[value];
			}
		},
		onLoad() {
			this.getList()
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
					console.log(res);
					this.list = this.page === 1 ? res:[...this.list, ...res];
					this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多'
				})
			},
			openLive(id){
				uni.navigateTo({
					url: '../live/live?id='+id
				});
			}
		}
	}
</script>

<style>
	.list-wrapper{
	}
	.item{
		width: 375rpx;
		height: 375rpx;
		padding: 5rpx;
		box-sizing: border-box;
		position: relative;
	}
	.item .image{
		 width: 365rpx;
		 height: 365rpx;
	}
	.coin{
		background: rgba(0,0,0,0.4);
		position: absolute;
		top: 15rpx;
		left: 15rpx;
	}
	.popularity{
		background: rgba(0,0,0,0.4);
		position: absolute;
		top: 15rpx;
		right: 15rpx;
	}
	.name{
		background: rgba(0,0,0,0.4);
		position: absolute;
		bottom: 15rpx;
		left: 15rpx;	
	}
	.state{
		background: rgba(0,0,0,0.4);
		position: absolute;
		bottom: 15rpx;
		right: 15rpx;
	}
	.state-icon{
		height: 20rpx;
		width: 20rpx;
		border-radius: 20rpx;
		background-color: red;
	}
</style>
