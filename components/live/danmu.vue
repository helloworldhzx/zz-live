<template>
	<scroll-view :show-scrollbar="false" :scroll-into-view="scrollIntoView" scroll-y scroll-with-animation class="danmu">
		<view v-for="(item,index) in list" :id="`dom${item.id}`" :key="item.id" class="flex align-center p-2 mb-2 rounded-circle bg-danger"
			style="background-color: rgba(255,255,255,0.125);">
			<text class="text-danger font mr-1">{{item.name}}:</text>
			<text class="text-white font">{{item.content}}</text>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		name: "danmu",
		data() {
			return {
				list: [],
				scrollIntoView: "",
			}
		},
		methods:{
			send(data){
				this.list.push(data);
				this.toBottom(data.id);
				/* if(this.list.length > 10){
					this.toClear();
				} */
			},
			toBottom(id){
				setTimeout(() => {
					this.scrollIntoView = "dom" + id;
				}, 300)
			},
			/* toClear(){
				setTimeout(() => {
					this.list = this.list.splice(2)
				}, 300)
			} */
		}
	}
</script>

<style>
	.danmu {
		width: 520rpx;
		height: 300rpx;
		position: fixed;
		bottom: 120rpx;
		left: 20rpx;
	}
</style>
