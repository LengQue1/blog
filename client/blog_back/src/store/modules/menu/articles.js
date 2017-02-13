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
			name: 'AllPost',
			path: '/allPost',
			component: lazyLoading('articles/allArticles')
		},
		{
			name: 'ComposePost',
			path: '/composePost',
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
		},
    {
      name: 'ComposePostId',
      path: '/ComposePost/:id?',
      component: lazyLoading('articles/composeArticles')
    }
	]
}
