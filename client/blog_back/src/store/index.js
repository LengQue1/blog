import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import * as actions from './actions'
import * as getters from './getters'

import app from './modules/app'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    app
  },
  state: {
    pkg
  },
  mutations: {
  }

})

export default store