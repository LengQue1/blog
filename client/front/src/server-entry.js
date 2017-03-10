import { app, router, store } from './main'
const isDev = process.env.NODE_ENV !== 'production'

export default context => {
  
  // set router's location
  router.push(context.url)
  const matchedComponents = router.getMatchedComponents()
  
  // no matched routes
  if (!matchedComponents.length) {
    return Promise.reject({ code: '404' })
  }
  let current =  router.history.current;
  context.path = current.path;
  context.query = current.query;
  context.params = current.params;
  context.url = current.fullPath;
  context.meta = app.$meta();

  return Promise.all(matchedComponents.map(component => {
    if (component.preFetch) {
      return component.preFetch(store, context);
    }
  })).then(res => {

    context.initialState = store.state
    
    const page = res.shift()
    
    if (page && page.h1) {
      app.title = page.h1
    }
    if (page) {
      context.title = page.title
      context.description = page.description
      context.keywords = page.keywords
    }
    
    return app
  })
}
