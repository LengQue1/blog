import lazyLoading from './lazyLoading'

export default {
  name: '系统设置',
  path: '',
  component: lazyLoading('settings/index'),
  meta: {
    icon: 'fa fa-cog',
    expanded: false,
  },
  children: [
    {
      name: '设置网站关键字',
      path: 'settings/setKey',
      component: lazyLoading('settings/settings')
    },

  ]
}
