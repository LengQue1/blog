module.exports = (app, router) => {
  router.get('/api/test', (ctx, next) => {
    ctx.body = '数据对接很成功!'
  });
  
  app.use(router.routes());
}