import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    test: '',
    progress: 0
  },
  mutations: {
    SET_TEST: (state, result) => {
      state.test = result
    },
    SET_PROGRESS_VALUE: (state, progress) => {
      state.progress = progress;
    }
  },
  actions: {
    FETCH_TEST: ({ commit, state, dispatch }) => {
      return api.fetchTest().then( result => {
        commit('SET_TEST', result);
      })
    },
    SET_PROGRESS: ({ commit, state }, progress) => {
      commit('SET_PROGRESS_VALUE', progress);
    },
    START_LOADING:({ commit, state, dispatch }) =>{
      dispatch('SET_PROGRESS', 30);
      let interval = setInterval(() => {
        let progress = state.progress;
        if (progress < 90) {
          let target = progress + 10;
          dispatch('SET_PROGRESS', target);
        }
      }, 400);
      return interval
    }
  },
  getters: {
    
  }
});