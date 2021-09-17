import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import Vuex from 'vuex'
import store from './store/index.js'
import $H from './common/request.js'

Vue.prototype.$store = store
Vue.prototype.$H = $H
Vue.prototype.authJump = (option) => {
	if(!store.state.token){
		uni.showToast({
			title:"请先登录",
			icon:"none"
		})
		return uni.navigateTo({
			url:"/pages/login/login"
		})
	}
	uni.navigateTo(option)
}
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif