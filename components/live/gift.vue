<template>
	<list class="gift ml-3" :show-scrollbar="false" :scrollable="true">
		<cell class="flex justify-start align-center pb-2" v-for="(item, index) in gifts" :key="index"
			insert-animation="default" delete-animation="default" :ref="'gift'+ index">
			<view class="flex justify-start align-center rounded-circle mr-3"
				style="width: 325rpx;background-image: linear-gradient(to right, #BCABB1 , #65AAF0);">
				<view class="">
					<image style="width: 70rpx;height: 70rpx;" src="../../static/tabbar/min.png" mode=""></image>
				</view>
				<view class="flex flex-1 flex-column mr-2">
					<text class="text-white font-md">{{item.username}}</text>
					<text class="text-white font-sm">{{item.gift_name}}</text>
				</view>
				<view class="">
					<image style="width: 70rpx;height: 70rpx;" :src="item.gift_image" mode=""></image>
				</view>
			</view>
			<text class="text-warning">X1</text>
		</cell>
	</list>
</template>

<script>
	var dom = weex.requireModule('dom')
	export default {
		name: 'gift',
		data() {
			return {
				gifts: [],
			}
		},
		methods: {
			send(data){
				/* {
					username: "发送人" + id,
					avatar: "",
					gift_name: "蛋糕",
					gift_image: "/static/gift/3.png",
					num: 1
				} */
				this.gifts.push(data)
				this.toBottom()
				this.toClear()
			},
			toBottom() {
				this.$nextTick(() => {
					if(this.gifts.length > 0 ){
						const index = this.gifts.length -1
						const id = 'gift' + index;
						if(this.$refs[id]){
							dom.scrollToElement(this.$refs[id][0], {})
						}
					}
				})
			},
			toClear(){
				if(this.gifts.length){
					setTimeout(()=>{
						this.gifts.splice(0,1)
					},5000)
				}
			}
		}
	}
</script>

<style>
	.gift {
		width: 520rpx;
		height: 520rpx;
	}
</style>
