import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    count: 0,
    load: false,
    items: [],
    blog: {},
    progress: 0,

  },


  mutations: {

    SET_PROGRESS_VALUE: (state, progress) => {
      state.progress = progress;
    },
    SET_ITEMS: ((state, { items }) => {
      state.items = items;
    }),
    SET_LOAD: ((state, isTrue ) => {
      state.load = isTrue;
    }),
    SET_BLOG: (state, blog) => {
      state.blog = blog;
    }

  },



  actions: {

    SET_PROGRESS: ({ commit, state }, progress) => {
      commit('SET_PROGRESS_VALUE', progress);
    },
    SET_LOAD: ({ commit, state }, isLoad) => {
      commit('SET_LOAD', isLoad);
    },
    START_LOADING:({ commit, state, dispatch }) =>{
      dispatch('SET_PROGRESS', 30);
      dispatch('SET_LOAD', true);
      let interval = setInterval(() => {
        let progress = state.progress;
        if (progress < 90) {
          let target = progress + 10;
          dispatch('SET_PROGRESS', target);
        }
      }, 400);
      return interval
    },
    FETCH_ITEM: ({ commit, state, dispatch }, { params, callback }) => {
      return api.fetchPost(params).then(items => {
        commit('SET_ITEMS', { items });
          callback && callback();
          return Promise.resolve();
      })
    },
    FETCH_BLOG: ({ commit, state, dispatch }, { params, callback }) => {
      return api.fetchPost(params).then( result => {
        console.log(result);
        let blog = result[0];
        commit('SET_BLOG', blog);
          callback && callback();
        return Promise.resolve();
      })
    }
  },
  getters: {
      items (state, getters) {
          const { items } = state;
          return items
      }
  }
});