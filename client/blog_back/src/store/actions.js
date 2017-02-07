import * as types from './mutation-types'
import Api from './api';

export const toggleSidebar = ({ commit }, opened) => commit(types.TOGGLE_SIDEBAR, opened)
export const toggleDevice = ({ commit }, device) => commit(types.TOGGLE_DEVICE, device)
export const expandMenu = ({ commit }, menuItem) => {
	if (menuItem) {
		menuItem.expanded = menuItem.expanded || false
		commit(types.EXPAND_MENU, menuItem)
	}
}
export const FETCH_USER = ({ commit, state }, { model, params,}) => {
  return Api.fetchList(model, params).then( response => {
    console.log(response);
  })
}
