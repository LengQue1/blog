import lazyLoading from './lazyLoading';

export default {
  name: '主页',
  path: '/',
  meta: {
    icon: 'fa-home',
    expanded: true
  },
  component: lazyLoading('home')
}
