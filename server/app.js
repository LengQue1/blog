// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const config = require('./config/config-default');
const model = require('./model');
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
    apiRouter(app, router, model[value], '/api');
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
        })

    }

    // static file support
    if (!isProduction) {
        let staticFiles = require('./static-files');
        app.use(staticFiles('/public/', __dirname + '/public'));
    }

    app.listen(3000);

    log.debug('app started at port 3000...');

})();

// 创建一条记录
// (async () =>{
//   var dog = await Pet.create({
//     id: 'd-' + Date.now(),
//     name: 'liu',
//     gender: false,
//     birth: '2009-08-08',
//     createdAt: Date.now(),
//     updateAt: Date.now(),
//     version: 0
//   });
//   console.log('created:' + JSON.stringify(dog));
// })();



//查询表
// (async () => {
//   //Pet.findAll()返回的一个或一组对象称为Model实例，每个实例都可以直接通过JSON.stringify序列化为JSON字符串。
//   // 但是它们和普通JSON对象相比，多了一些由Sequelize添加的方法，比如save()和destroy()。调用这些方法我们可以执行更新或者删除操作。
//   var pets = await Pet.findAll({
//     where: {
//       name: 'wen'
//     }
//   });
//   console.log(`find ${pets.length} pets:`);
//   for (let p of pets){
//     console.log(JSON.stringify(p));
//     // 直接修改查询到的每个json数据
//     p.name = 'wen';
//     p.gender = true;
//     p.updateAt = Date.now();
//     p.version ++;
//     // 通过调用json数据的 save 可以保存
//     await p.save();
//     if (p.version === 3 ){
//       // 删除
//       await p.destroy();
//       console.log(`${p.name} was destroyed`);
//     }
//   }
// })();

