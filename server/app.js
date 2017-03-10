// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const router = require('koa-router')();
const options = require('./config/options');
const bodyParser = require('koa-bodyparser');
const config = require('./config/config-default');
const model = require('./setupModels/model');
const log4js = require('log4js');
const md5 = require('md5');
const apiRouter = require('./routes/routes');
let User = model.User;
let log = log4js.getLogger(config.appName);
// 创建一个Koa对象表示web app本身:
const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';
// log request URL;
app.use(async (ctx, next) => {
  var start = new Date().getTime(), execTime;
  await next();
  execTime = new Date().getTime() - start;
  log.info(`${ctx.method} ${decodeURIComponent(ctx.url)} - ${execTime}ms`);
});

// bodyParser
app.use(bodyParser());


// 使用中间件位路由 add router middleware;
Object.keys(model).forEach(value => {
    apiRouter(app, router, model[value], '/api', model.sequelize);
});


(async () => {

    const IsExistedUser  = await User.count();

    if (IsExistedUser == 0) {

        if (config.defaultAdminName == '' && config.defaultAdminPassword == '') {
            log.error('default passoword and username Not null ');
            return process.exit(1);
        }

        let createDefaultUser = await User.create({
            username: config.defaultAdminName,
            password: md5(config.defaultAdminPassword),
            email: config.email
        });

        await initOptions();

    }

    app.listen(3000);
    log.debug('app started at port 3000...');

})();

async function initOptions() {
  for (let i = 0, len = options.length; i < len; i++ ){
    let count = await model.options.count({where: {key: options[i].key}});
    if (count === 0) {
      await model.options.create({
        key: options[i].key,
        value: options[i].value
      })
    }
  }
}



