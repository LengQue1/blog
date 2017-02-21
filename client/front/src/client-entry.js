require('es6-promise').polyfill();
import {app, router, store} from './main';

store.replaceState(window.__INITIAL_STATE__);
app.$mount('#app');


router.beforeEach((to, from, next) => {
    let loadingPromise = store.dispatch('START_LOADING');
    let endLoadingCallback = () => {
        return loadingPromise.then(interval => {
            clearInterval(interval);
            store.dispatch('SET_LOAD', false);
            store.dispatch('SET_PROGRESS', 100);
            store.dispatch('SET_PATH', to.fullPath);
            store.dispatch('SET_TOGGLE', false);
            next()
        })
    };


    if (to.matched.length !== 0) {
        let component = to.matched[0].components.default

        if (component.preFetch) {
            // component need fetching some data before navigating to it
            return component.preFetch(store, to, endLoadingCallback)
        } else {
            // component's a static page and just navigate to it
            endLoadingCallback()
        }
    } else {
        // TODO: redirect to a global 404 page
        endLoadingCallback()
    }
});