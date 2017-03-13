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
  FETCH_OPTIONS: ({ commit, state }, { model, params }) => {
    return Api.fetchList(model, params).then( items => {
      let obj = items.reduce((prev, curr) => {
        prev[curr.key] = curr
        return prev
      }, {});
      commit(types.SET_OPTIONS, obj)
    })
  },
  POST: ({ commit, state }, { model, form }) => {
    let {id: id} = form;
    if (id !== undefined ) {
      return Api.patchById(model, id, form);
    } else {
      return Api.post(model, form);
    }
  },
  FETCH_LIST: ({ commit, state }, { model, params }) => {
    return Api.fetchList(model, params).then( obj => {
      commit(types.SET_LIST, obj);
    })
  },
  FETCH_UPDATE: ({ commit, state }, { model, params }) => {
    return Api.update(model, params);
  },
  FETCH: ({ commit, state }, { model, params }) => {
    return Api.fetchList(model, params)
  },
  FETCH_BY_ID: ({ commit, state }, { model, id, params }) => {
    return Api.fetchById(model, id, params);
  },
  PATCH_BY_ID: ({ commit, state }, { model, id, params}) => {
    return Api.patchById(model, id, params);
  },
  DELETE_BY_ID: ({ commit, state }, { model, id}) => {
    return Api.deleteById(model, id);
  },

}


