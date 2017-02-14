import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'
import articles from './articles'
import home from './home'

const state = {
	items: [
    home,
		articles,
	]
}

const mutations = {
	[types.EXPAND_MENU] (state, menuItem) {
		if (menuItem.index > -1) {
			if (state.items[menuItem.index] && state.items[menuItem.index].meta) {
				state.items[menuItem.index].meta.expanded = menuItem.expanded
			}
		} else if (menuItem.item && 'expanded' in menuItem.item.meta) {
			menuItem.item.meta.expanded = menuItem.expanded
		}
	}
}

export default {
	state,
	mutations
}
