<template>
	<view class="border-top border-light-secondary p-2">
		<view class="py-4 bg-main rounded flex flex-column align-center justify-center">
			<text class="text-white font-sm mb-2">当前金币</text>
			<text class="font-weight-bold text-white" style="font-size: 60rpx;">50</text>
		</view>
		<view class="border-top border-light-secondary my-2"></view>
		<view class="">
			<text class="text-muted">请选择充值金币</text>
			<view class="flex flex-wrap justify-between">
				<view class="mt-2 " style="width: 30%;" v-for="(item, index) in list" :key="index"
					@click="selectCoin(item.price, index)">
					<view v-if="item.price" class="flex flex-column align-center justify-center border rounded"
						style="height: 130rpx;" :class="activeIndex === index?'border-main':''">
						<view class="flex align-center">
							<text class="iconfont text-warning mr-1">&#xe633;</text>
							<text class="font-weight-bold font-md">{{item.coin}}</text>
						</view>
						<view class="text-secondary">￥{{item.price}}</view>
					</view>
					<view v-else class="flex flex-column align-center justify-center border rounded"
						style="height: 130rpx;">
						<view class="text-secondary">自定义金额</view>
					</view>
				</view>
			</view>
		</view>
		<view class="flex justify-between position-fixed left-0 bottom-0 right-0 border-top border-light-secondary"
			style="height: 100rpx;">
			<view class="flex align-center ml-3">
				<text class="iconfont text-warning mr-1">&#xe633;</text>
				<text class="font-weight-bold font-md">{{price}}</text>
			</view>
			<view class="flex align-center justify-center my-2 px-2 mr-3 rounded bg-main">
				<text class="font text-white">去充值</text>
			</view>
		</view>

		<uni-popup ref="coinPopup" type="bottom" @change="coinPopupChange">
			<view class="bg-white py-2" style="height: 600rpx; background-color: #F7F7F7">
				<view class="bg-white p-2">
					<!-- 充值输入框 -->
					<view class="flex align-center justify-between px-2 rounded" style="background-color: #F7F7F7; height: 80rpx;">
						<text class="text-secondary">充值金额</text>
						<view class="flex justify-end align-center" style="width: 100rpx;">
							<text class="input">{{inputCoin}}</text>
							<text class="ml-1">元</text>
						</view>
					</view>
					<!-- 可得金币 -->
					<view class="flex align-center justify-between bg-white px-2" style="height: 60rpx">
						<text class="text-secondary">金币数量</text>
						<view class="flex align-center">
							<text>{{inputCoin}}</text>
							<text>金币</text>
						</view>
					</view>
				</view>

				<!-- 键盘区域 -->
				<view class="flex  keyboard p-1">
					<view class="number flex flex-wrap justify-between" style="width: 545rpx;">
						<view style="width: 175rpx; height: 90rpx;"
							class="rounded mb-2 flex justify-center align-center bg-white font-weight-bold"
							v-for="item in 9" v-if="item !== 0"
							@click="onNumber(item)"
							>
							{{item}}
						</view>
						<view style="width: 545rpx; height: 90rpx;"
							class="rounded flex justify-center align-center bg-white font-weight-bold"
							@click="onNumber(0)"
							>0</view>
					</view>
					<view class="option flex flex-column justify-between ml-1">
						<text class="rounded bg-white flex justify-center align-center font-lg"
							style="width: 175rpx; height: 90rpx;" @click="onDelete">X</text>
						<text class="bg-danger rounded text-white flex justify-center align-center font-lg"
							style="height: 310rpx; width: 175rpx;" @click="recharge">充值</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inputCoin: "",
				activeIndex: -1,
				price: 0,
				list: [{
					coin: 10,
					price: 10
				}, {
					coin: 20,
					price: 20
				}, {
					coin: 30,
					price: 30
				}, {
					coin: 50,
					price: 50
				}, {
					coin: 100,
					price: 100
				}, {
					price: 0
				}],
			}
		},
		methods: {
			selectCoin(price, index) {
				if (price) {
					this.price = price;
					this.activeIndex = index;
				} else {
					this.activeIndex = -1
					this.$refs.coinPopup.open()
				}
			},
			onNumber(number){
				if(!this.inputCoin && number === 0){
					return
				}
				this.inputCoin += number
				if(this.inputCoin > 50000){
					uni.showToast({
						title: "最多可充值5万"
					})
					this.inputCoin = "50000"
					return
				}
			},
			onDelete(){
				if(this.inputCoin.length){
					this.inputCoin = this.inputCoin.slice(0, this.inputCoin.length-1)
				}
			},
			recharge(){
				this.$H.post('/wxpay', { price: this.inputCoin }, { token: true }).then(orderInfo => {
					console.log(orderInfo);
					uni.requestPayment({
						provider:"wxpay",
						orderInfo:orderInfo,
						success: (res) => {
							this.$refs.coinPopup.close()
							this.$store.dispatch('getUserInfo')
							uni.showToast({
								title: '充值成功',
								icon: 'none'
							});
							uni.navigateBack({
								delta: 1
							});
							console.log(res);
						},
						fail: (err) => {
							console.log(err);
							uni.showModal({
								title: '提示',
								content: '支付失败',
								showCancel: false,
							});
						}
					})
				})
				
			},
			coinPopupChange(value){
				console.log(value);
				if(!value.show){
					this.inputCoin = ""
				}
			}
		}
	}
</script>

<style>
	.input {
		position: relative;
	}

	.input::after {
		position: absolute;
		content: "";
		display: inline-block;
		width: 2rpx;
		height: 30rpx;
		top: 50%;
		transform: translateY(-50%);
		animation: blink 1.2s infinite steps(1, start);
	}

	@keyframes blink {

		0%,
		100% {
			background-color: red;
		}

		50% {
			background-color: transparent;
		}
	}
</style>
