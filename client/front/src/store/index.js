import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    test: ''
  },
  mutations: {
    SET_TEST: (state, result) => {
      console.log(result)
      state.test = result
    }
  },
  actions: {
    FETCH_TEST: ({ commit, state, dispatch }) => {
      return api.fetchTest().then( result => {
        commit('SET_TEST', result);
      })
    }
  },
  getters: {
    
  }
});