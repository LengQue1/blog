import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({

  state: {
    count: 0,
    load: false,
    totalPage: -1,
    items: [],
    blog: {},
    page: {},
    progress: 0,
    archive: {},
    prevPage: {},
    nextPage: {},
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
    },

    SET_PAGE: (state, { blog }) => {
      state.page = blog;
    },

    SET_TOTAL_PAGE: (state, { totalPage }) => {
      state.totalPage = totalPage;
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
    FETCH_ITEM: ({ commit, state, dispatch }, { params, model,  callback }) => {
      return api.fetchPost(params, model).then(items => {
        commit('SET_ITEMS', { items });
          callback && callback();
        if (state.totalPage === -1) {
          return api.fetchPost({params: {}}, model).then(totalPage => {
            commit('SET_TOTAL_PAGE', {
              totalPage: Math.ceil(totalPage.length / 4)
            })
          })
        }
          return Promise.resolve();
      })
    },
    FETCH_PAGE: ({ commit, state, dispatch }, { params, model, callback }) => {
      return api.fetchPost(params, model).then(result => {
        let blog = result[0];
        commit('SET_PAGE', { blog });
        callback && callback();
      })
    },
    FETCH_BLOG: ({ commit, state, dispatch }, { params, model, callback }) => {
      return api.fetchPost(params, model).then( result => {
        let blog = result[0];
        commit('SET_BLOG',{ blog });
          callback && callback();
        return Promise.resolve();
      })
    },
    FETCH_BY_ID: ({ commit, state, dispatch }, { model, id, params, callback}) => {
      return api.fetch(model,id, params).then( items => {
        commit('SET_ITEMS', { items });
        callback && callback();
        if (state.totalPage === -1) {
          return api.fetchPost({params: {}}, model).then(totalPage => {
            commit('SET_TOTAL_PAGE', {
              totalPage: Math.ceil(totalPage.length / 4)
            })
          })
        }
        return Promise.resolve();
      })
    },
    FETCH_ARCHIVE: ({ commit, state, dispatch }, { params, model, callback }) => {
      return api.fetchPost(params, model).then(items => {
        let sortedItem = items.reduce((prev, curr) => {
          let time = curr.createdAt.slice(0, 4);
            // 上次返回的 prev 对象中是否存在 prev[time] 之类的对象
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