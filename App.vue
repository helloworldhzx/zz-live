<script>
	export default {
		onLaunch: function() {
			// nvue页面中使用iconfont需要这种方式导入，unicode形式
			 const domModule = uni.requireNativePlugin('dom')
			 domModule.addRule('fontFace', {
			 'fontFamily': "iconfont",
			 'src': "url('http://at.alicdn.com/t/font_1859985_7mxozsfdvib.ttf')"
			});
			
			// minButton 没有pagePath 需要监听
			uni.onTabBarMidButtonTap(function(){
				console.log("path")
				uni.navigateTo({
					url:"/pages/live/live",
					success() {
						console.log(1)
					},
					fail(e) {
						console.log(e);
					}
				})
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("common/free.css");
	@import url("common/common.css");
	/* #ifndef APP-PLUS-NVUE */
	@import url("common/icon.css");  /* icon font形式*/
	/* #endif */
</style>
