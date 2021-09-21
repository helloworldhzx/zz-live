<template>
	<live-list :list="list"></live-list>
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
		onLoad() {
			this.getList()
		},
		methods: {
			getList(){
				this.$H.get('/user/history/'+this.page, {token: true}).then(res => {
					console.log(res);
					this.list = this.page === 1 ? res:[...this.list, ...res];
					// this.loadText = res.length < 10 ? '没有更多了' : '上拉加载更多'
				})
			}
		}
	}
</script>

<style>
</style>
