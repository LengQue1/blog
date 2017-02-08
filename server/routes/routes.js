const { login, logout, permission } = require('./admin');
const generateActions = require('./actions');
let registerAdmin = false;

module.exports = (app, router, model, prefix = "") => {

  if (!registerAdmin) {
      router.get('/api/test', (ctx, next) => {
          ctx.body = 'server API!'
      });
      router.post(prefix + '/admin/login', login);
      router.post(prefix + '/admin/logout', logout);
      registerAdmin = true;
  }

  const actions = generateActions(model);

  router.get(prefix + ("/" + model.name), permission, actions.findAll);
  
  app.use(router.routes());
};