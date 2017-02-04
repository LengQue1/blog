const { login, logout } = require('./admin');

module.exports = (app, router) => {
  
  router.get('/api/test', (ctx, next) => {
    ctx.body = 'server API!'
  });
  
  router.post('/api/admin/login', login);
  
  router.post('/api/admin/logout', logout);
  
  app.use(router.routes());
}