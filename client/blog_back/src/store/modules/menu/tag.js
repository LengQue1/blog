import lazyLoading from './lazyLoading'

export default {
  name: '标签',
  path: '',
  component: lazyLoading('tag/index'),
  meta: {
    icon: 'fa-tags',
    expanded: false,
  },
  children: [
    {
      name: '标签列表',
      path: 'tag/list',
      component: lazyLoading('commonModule/list')
    },
    {
      name: '创建标签',
      path: 'tag/create/:id?',
      component: lazyLoading('commonModule/create')
    }
  ]
}
