import lazyLoading from './lazyLoading'


export default {
  name: '分类',
  path: '',
  component: lazyLoading('categories/index'),
  meta: {
    icon: 'fa-folder-open',
    expanded: false,
  },
  children: [
    {
      name: '分类列表',
      path: 'categories/list',
      component: lazyLoading('commonModule/list')
    },
    {
      name: '创建分类',
      path: 'categories/create/:id?',
      component: lazyLoading('commonModule/create')
    }
  ]
}
