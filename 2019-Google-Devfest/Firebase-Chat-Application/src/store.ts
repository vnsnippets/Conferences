import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    username: null,
    messages: []
  },
  getters: {

  },
  mutations: {
    setUsername(state, payload) {
      state.username = payload;
    }
  },
  actions: {
    SetUsernameAsync(state, payload) {
      state.commit('setUsername', payload);
    }
  }
})
