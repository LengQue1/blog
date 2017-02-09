import lazyLoading from './lazyLoading';

export default {
  name: 'home',
  path: '/',
  meta: {
    icon: 'fa-home',
    expanded: true
  },
  component: lazyLoading('home')
}
