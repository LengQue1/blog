import lazyLoading from './lazyLoading'

export default {
	name: 'Articles',

	meta: {
		icon: 'fa-file-text-o',
		expanded: false,
		label: 'Articles'
	},

	children: [
		{
			name: 'AllArticles',
			path: '/allArticles',
			component: lazyLoading('articles/allArticles')
		},
		{
			name: 'ComposeArticles',
			path: '/composeArticles',
			component: lazyLoading('articles/composeArticles')
		},
		{
			name: 'Tag',
			path: '/tag',
			component: lazyLoading('articles/tag')
		},
		{
			name: 'Comment',
			path: '/comment',
			component: lazyLoading('articles/comment')
		}
	]
}