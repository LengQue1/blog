import Vue from 'vue'
import VueRouter from 'vue-router'
import menuModule from 'vuex-store/modules/menu'
import Home from 'content-view/home'

Vue.use(VueRouter)

export default new VueRouter({
	linkActiveClass: 'is-active',
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{
			name: 'Home',
			path: '/',
			component: Home
		},
		...generateRoutesFromMenu(menuModule.state.items),
		{
			path: '*',
			redirect: '/'
		}
	]
})


function generateRoutesFromMenu (menu = [], routes = []) {
	for (let i = 0, l = menu.length; i < l; i++) {
		let item = menu[i]
		if (item.path) {
			routes.push(item)
		}
		if (!item.component) {
			generateRoutesFromMenu(item.children, routes)
		}
	}

	return routes
}