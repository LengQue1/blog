import Vue from 'vue'
import Vuex from 'vuex'
import pkg from 'package'
import actions from './actions'
import getters from './getters'
import * as types from './mutation-types';

import app from './modules/app'
import menu from './modules/menu/'

Vue.use(Vuex)

const store = new Vuex.Store({
  actions,
  getters,
  modules: {
    app,
    menu
  },
  state: {
    users: {},
    list: [],
    pkg
  },
  mutations: {
    [types.SET_USER] (state, user) {
      state.users = user.user
    },
    [types.SET_LIST] (state, obj) {
      state.list = obj
    }
  }

});

export default store
