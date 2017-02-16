import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import NavBar from '../components/NavBar.vue';
import Main from  '../components/Main.vue';
import Post from '../components/Post.vue';

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
        name: 'archive',
        path: '/archive',
        components:{
            NavBar: NavBar,
            default: Main
        }
	},
    {
        name: 'post',
        path: '/post/:pathName',
        components:{
            NavBar: NavBar,
            default: Post,
        }
    }
  ]
});