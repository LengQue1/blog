const { login, logout, permission } = require('./admin');
const generateActions = require('./actions');
let registerAdmin = false;

module.exports = (app, router, model, prefix = "", sequelize) => {

  if (!registerAdmin) {
      router.get('/api/test', (ctx, next) => {
          ctx.body = 'server API!'
      });
      router.post(prefix + '/admin/login', login);
      router.post(prefix + '/admin/logout', logout);
      registerAdmin = true;
  }

  const actions = generateActions(model, sequelize);

    if (model.name !== 'user') {
        router.get(prefix + ("/" + model.name), actions.findAll);
        router.get(prefix + ("/" + model.name + "/:id"), actions.findById);
    } else {
        router.get(prefix + ("/" + model.name), permission, actions.findAll);
        router.get(prefix + ("/" + model.name + "/:id"), permission, actions.findById);
    }


  router.post(prefix + ("/" + model.name), permission, actions.create);
  router.post(prefix + ("/" + model.name + "/:id"), permission, actions.updateById);

  router.put(prefix + ("/" + model.name ), permission, actions.update);
  router.put(prefix + ("/" + model.name + "/:id"), permission, actions.replaceId);

  router.del(prefix + ("/" + model.name + "/:id"), permission, actions.deleteById);
  router.patch(prefix + ("/" + model.name + "/:id"), permission, actions.updateById);

  app.use(router.routes());
};