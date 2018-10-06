import Vue from 'vue'
import Vuex from 'vuex'
import chef from './modules/chef'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    chef,
  },
})