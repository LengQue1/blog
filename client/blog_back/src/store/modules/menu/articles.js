import lazyLoading from './lazyLoading'
import Main from '../../../components/Main.vue'

export default {
	name: 'Articles',
  path: '/post',
  component: Main,
	meta: {
		icon: 'fa-file-text-o',
		expanded: false,
		label: 'Articles'
	},
	children: [
		{
			name: 'AllPost',
			path: 'allPost',
			component: lazyLoading('articles/allArticles')
		},
		{
			name: 'ComposePost',
			path: 'composePost/:id?',
			component: lazyLoading('articles/composeArticles')
		},
		{
			name: 'Tag',
			path: 'tag',
			component: lazyLoading('articles/tag')
		},
		{
			name: 'Comment',
			path: 'comment',
			component: lazyLoading('articles/comment')
		}
	]
}
