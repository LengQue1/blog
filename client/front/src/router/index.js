import Vue from 'vue';
import Router from 'vue-router';

import Main from '../components/Main.vue';
import View1 from '../components/View1.vue';
import View2 from '../components/View2.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
	{ path: '/', component: Main },
	{ path: '/view1', component: View1 },
	{ path: '/view2', component: View2 }
  ]
});