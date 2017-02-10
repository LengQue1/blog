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
  router.get(prefix + ("/" + model.name + "/:id"), permission, actions.findById);

  router.post(prefix + ("/" + model.name), permission, actions.create);
  router.post(prefix + ("/" + model.name + "/:id"), permission, actions.updateById);

  router.del(prefix + ("/" + model.name + "/:id"), permission, actions.deleteById);

  app.use(router.routes());
};