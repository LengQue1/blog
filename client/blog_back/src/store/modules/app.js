import * as types from '../mutation-types'
const state = {
  device: {
		isMobile: false,
		isTablet: false,
    isLogin: false
  },
  sidebar: {
    opened: false,
		hidden: false
  }
}

const mutations = {
  [types.TOGGLE_DEVICE] (state, device) {
    state.device.isMobile = device === 'mobile'
		state.device.isTablet = device === 'tablet'
    // state.device.isLogin = device;
  },
  [types.TOGGLE_SIDEBAR] (state, opened) {
    if (state.device.isMobile) {
      state.sidebar.opened = opened
		} else {
		  state.sidebar.opened = true
		}
  }
}

export default {
  state,
  mutations
}
