<template>
	<live-list :list="list" :handleCreateLive="handleCreateLive"></live-list>
</template>

<script>
	import liveList from '../../components/live/liveList.vue'
	export default {
		data() {
			return {
				list: [],
				page: 1
			}
		},
		components:{
			liveList
		},
		onPullDownRefresh() {
			this.page = 1
			this.getList().then(() => {
				uni.stopPullDownRefresh();
			})
		},
		onReachBottom(){
			this.page++;
			this.getList();
		},
		mounted() {
			this.getList()
		},
		methods: {
			getList(){
				console.log(this.$store.state.user.id);
				this.$H.get('/live/list/'+this.page + '?user_id='+this.$store.state.user.id, {token: true}).then(res => {
					console.log(res);
					this.list = this.page === 1 ? res:[...this.list, ...res];
					// this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多'
				})
			},
			handleCreateLive(id){
				this.$H.get('/live/read/' + id).then(res=>{
					console.log(res);
					uni.navigateTo({
						url: `../liveroom/liveroom?data=${encodeURIComponent(JSON.stringify(res))}`,
					});
				})
			}
		}
	}
</script>

<style>
</style>
