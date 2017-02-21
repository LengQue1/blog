import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);

import NavBar from '../components/NavBar.vue';
import Main from  '../components/Main.vue';
import Post from '../components/Post.vue';
import Archive from '../components/archive.vue';
import NotFoundComponent from '../components/NotFound.vue'

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
            default: Archive
        }
	},
    {
        name: 'post',
        path: '/post/:pathName',
        components:{
            NavBar: NavBar,
            default: Post,
        }
    },
    {
        name: 'NotFound',
        path: '*',
        components:{
            default: NotFoundComponent,
            NavBar: NavBar
        }
    }
  ]
});