<template>
	<view>
		<view class="flex flex-column justify-center align-center">
			<view @click="changeAvatar" class="flex justify-center align-center position-relative bg-secondary rounded-circle">
				<image class=" rounded-circle"  style="height: 150rpx; width: 150rpx; opacity: 0.1;" :src="user.avatar || '/static/avatar.png'"></image>
				<text class="position-absolute iconfont text-white">&#xe605;</text>
			</view>
			<text>点击更换头像</text>
		</view>
		<f-list-item title="姓名">
			<text class="text-muted font">{{user.username}}</text>
		</f-list-item>
	</view>
</template>

<script>
	import fListItem from '../../components/common/f-list-item.vue';
	import $H from "../../common/request.js"
	import $C from '../../common/config.js'
	export default {
		data() {
			return {
				user: {}
			}
		},
		onLoad(e){
			console.log(e);
			this.user = JSON.parse(decodeURIComponent(e.user))
		},
		components:{
			fListItem
		},
		methods: {
			changeAvatar(){
				uni.chooseImage({
					count: 1,
					success(res) {
						$H.upload("/upload", {
							filePath:res.tempFilePaths[0]
						}).then(res => {
							// this.user.avatar = $C.imageUrl + res.url
							$H.post("/user/update", { avatar: $C.imageUrl + res.url }, {token: true}).then(user => {
								uni.navigateBack({
									delta:1
								})
							})
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
