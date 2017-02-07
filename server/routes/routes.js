const { login, logout, permission } = require('./admin');

module.exports = (app, router) => {
  
  router.get('/api/test', (ctx, next) => {
    ctx.body = 'server API!'
  });
  
  router.post('/api/admin/login', login);
  
  router.post('/api/admin/logout', logout);

  // router.get('')
  
  app.use(router.routes());
};