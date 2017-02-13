import * as types from './mutation-types'
import Api from './api';

export default {
  toggleSidebar: ({ commit }, opened) => {commit(types.TOGGLE_SIDEBAR, opened)},
  toggleDevice: ({ commit }, device) => {commit(types.TOGGLE_DEVICE, device)},
  expandMenu: ({ commit }, menuItem) => {
    if (menuItem) {
      menuItem.expanded = menuItem.expanded || false
      commit(types.EXPAND_MENU, menuItem)
    }
  },
  FETCH_USER: ({ commit, state }, { model, params, username}) => {
    return Api.fetchList(model, params).then( response => {
      response.forEach((user) => {
        if (user.username === username) {
          commit(types.SET_USER, { user });
        }
      });
    });
  },
  POST: ({ commit, state }, { model, form }) => {
    return Api.post(model, form);
  },
  FETCH_LIST: ({ commit, state }, { model, params }) => {
    return Api.fetchList(model, params).then( obj => {
      commit('SET_LIST', obj)
    })
  }

}


