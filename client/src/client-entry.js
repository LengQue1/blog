require('es6-promise').polyfill();
import {app,router,store} from './main';

store.replaceState(window.__INITIAL_STATE__);
app.$mount('#app');