module.exports = (app, router) => {
  router.get('/api/test', (ctx, next) => {
    ctx.body = '来自 server API!'
  });
  
  app.use(router.routes());
}