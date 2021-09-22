import Vuex from "vuex"
import Vue from 'vue'
import $H from '../common/request.js'
import $C from '../common/config.js'
import io from '../common/uni-socket.io.js'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		follow: [],
		token: null,
		socket: null
	},
	mutations: {
		addFollow (state, payload) {
		  // 变更状态
		  console.log(payload);
		  console.log(state.follow);
		  console.log(state.follow.push(payload));
		  state.follow = [...state.follow, payload]
		}
	},
	actions: {
		connectSocket({ state }){
			 const socket = io($C.socketUrl, {
			    // 实际使用中可以在这里传递参数
			    query: {},
			    transports: ['websocket']
			  });
			  
			  const onlineEvent = (e) => {
				  // vue触发事件，与$on对应
				  uni.$emit('live', {
					  type: 'online',
					  data: e
				  })
			  }
			  const commentEvent = (e) => {
				  uni.$emit('live', {
					  type: 'comment',
					  data: e
				  })
			  }
			  const giftEvent = (e) => {
				  uni.$emit('live', {
					  type: 'gift',
					  data: e
				  })
			  }
			  const liveStatusEvent = (e) => {
				  uni.$emit('liveStatus', e)
			  }
			  
			  socket.on('connect', () => {
				console.log('已成功');
				state.socket = socket
				socket.on(socket.id, (e) => {
					const d = e.data;
					if(d.action === "error"){
						if(e.meta.notoast){
							return
						}
						return uni.showToast({
							title: d.payload,
							icon: 'none'
						});
					}
				})
			  });
			  
			  // 监听用户加入  对应后端nsp.to(room).emit('online')返回
			  socket.on('online', onlineEvent)
			  socket.on('comment', commentEvent)
			  socket.on('gift', giftEvent)
			  socket.on('changeLiveStatus', liveStatusEvent)
			  
			  
			  // 移除监听事件
			  const removeEvent = () => {
				  socket.removeListener('online', onlineEvent)
				  socket.removeListener('comment', commentEvent)
				  socket.removeListener('gift', giftEvent)
				  socket.removeListener('changeLiveStatus', liveStatusEvent)
			  }
			  
			  socket.on('error', (e) => {
				state.socket = null
				removeEvent()
			  	console.log('连接失败');
			  });
			  
			  socket.on('disconnect', () => {
				state.socket = null
				removeEvent()
			  	console.log('已断开');
			  });
		},
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
		// 初始化用户登录状态
		initUser({ state,dispatch }){
			let u = uni.getStorageSync('user')
			let t = uni.getStorageSync('token')
			let f = uni.getStorageSync('follow')
			if(u){
				state.user = JSON.parse(u)
				state.token = t
				state.follow = f
				// 连接socket
				console.log('连接socket')
				dispatch('connectSocket')
			}
		},
		getUserInfo({ state }){
			$H.get('/user/info',{
				token:true,
				noJump:true,
				toast:false
			}).then(res=>{
				state.user = res.user
				state.follow = res.follow
				uni.setStorageSync('follow', res.follow)
				uni.setStorage({
					key:"user",
					data:JSON.stringify(state.user)
				})
			})
		}
	}
})
