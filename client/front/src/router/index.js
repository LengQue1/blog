import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import NavBar from '../components/NavBar.vue';
import Main from  '../components/Main.vue';

export default new Router({
  mode: 'history',
  routes: [
	{
	    name: 'home',
	    path: '/',
		components:{
	    	NavBar: NavBar,
            default: Main
		},
	},
	{
        name: 'file',
        path: '/file',
        components:{
            default: Main
        }
	}
  ]
});