import lazyLoading from './lazyLoading'


export default {
	name: '文章',
  path: '',
  component: lazyLoading('articles/index'),
	meta: {
		icon: 'fa-file-text-o',
		expanded: true,
	},
	children: [
		{
			name: '所有文章',
			path: 'post/allPost',
			component: lazyLoading('articles/allArticles')
		},
		{
			name: '撰写文章',
			path: 'post/composePost/:id?',
			component: lazyLoading('articles/composeArticles')
		},

	]
}
