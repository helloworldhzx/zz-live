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
			<view class="item text-white" v-for="item in 10">
				<image class="image rounded" src="../../static/1.jpg" mode="aspectFill"></image>
				<!-- 金币 -->
				<view class="coin flex align-center rounded-circle px-2">
					<text class="iconfont iconbizhongguanli text-warning mr-1"></text>
					<text>0</text>
				</view>
				<!-- 人气 -->
				<view class="popularity flex align-center rounded-circle px-2">
					<text class="mr-1">人气：</text>
					<text>0</text>
				</view>
				<!-- 直播name -->
				<view class="name flex align-center rounded-circle px-2 py-1">
					<text class="font-sm">啊啊啊啊啊</text>
				</view>
				<!-- 直播状态 -->
				<view class="state flex align-center rounded-circle px-2 py-1">
					<text class="state-icon mr-1"></text>
					<text class="state-text font-sm">已结束</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {

		},
		methods: {

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
