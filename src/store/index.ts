import { createStore } from 'vuex'

export default createStore({
  state: {
    user:'',
    token:''
  },
  mutations: {
    setuser(state){
      state.user=(localStorage.getItem('user')!)
    },
    settoken(state){
      state.token=(localStorage.getItem('token')!)
    }
  },
  actions: {
  },
  modules: {
  }
})
