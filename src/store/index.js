import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Id:""
  },
  mutations: {
    changeId (state, payload) {
      state.Id = payload.loginId;
    }
  },
  actions: {
  },
  modules: {
  }
})
