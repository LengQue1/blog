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
    archive: {},
    curPath: '',
    toggle: false
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
    SET_BLOG: (state, { blog }) => {
      Vue.set(state, 'blog', blog);
    },

    SET_ARCHIVE: (state, { sortedItem }) => {
      state.archive = sortedItem;
    },

    SET_PATH_VALUE: (state, path) => {
      state.curPath = path
    },

    SET_TOGGLE_VALUE: (state, toggle) => {
        state.toggle = toggle
    }

  },



  actions: {

    SET_PROGRESS: ({ commit, state }, progress) => {
      commit('SET_PROGRESS_VALUE', progress);
    },
    SET_LOAD: ({ commit, state }, isLoad) => {
      commit('SET_LOAD', isLoad);
    },
    SET_PATH: ({ commit, state, dispatch}, path) => {
      commit('SET_PATH_VALUE', path);
    },
    SET_TOGGLE: ({ commit, state, dispatch}, toggle) => {
        commit('SET_TOGGLE_VALUE', toggle);
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
        let blog = result[0];
        commit('SET_BLOG',{ blog });
          callback && callback();
        return Promise.resolve();
      })
    },

    FETCH_ARCHIVE: ({ commit, state, dispatch }, { params, callback }) => {
      return api.fetchPost(params).then(items => {
        let sortedItem = items.reduce((prev, curr) => {
          let year = curr.createdAt.slice(0, 4);
          let time = curr.createdAt.slice(0, 4);
            if (typeof prev[time] === 'undefined') {
                prev[time] = [curr]
            } else {
                prev[time].push(curr)
            }
            return prev

        }, {});
        commit('SET_ARCHIVE', { sortedItem });
        callback && callback();
      })
    }



  },
  getters: {
      items (state, getters) {
          const { items } = state;
          return items
      },
      archive (state, getters) {
        const { archive } = state;
        return archive;
      }
  }
});