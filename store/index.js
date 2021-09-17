import Vuex from "vuex"
import Vue from 'vue'
import $H from '../common/request.js'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		token: null
	},
	actions: {
		login({ state }, payload){
			state.user = payload;
			state.token = payload.token;
			uni.setStorageSync('user', payload)
			uni.setStorageSync('token', payload.token)
		},
		logout({ state,dispatch }){
			$H.post('/logout',{},{
				token:true,toast:false
			})
			// console.log('断开socket')
			// dispatch('closeSocket')
			state.user = null
			state.token = null
			uni.removeStorageSync('user')
			uni.removeStorageSync('token')
		},
	}
})
