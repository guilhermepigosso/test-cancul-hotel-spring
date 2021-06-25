import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    message: {
      type: null,
      message: null
    },
    message_modal: {
      type: null,
      message: null
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
