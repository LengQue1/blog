// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const controller  = require('./controllers');
const template = require('./template');
const config = require('./config/config-default');
const model = require('./model');
let User = model.User;
let Test = model.test;
// 创建一个Koa对象表示web app本身:
const app = new Koa();
const isProduction = process.env.NODE_ENV === 'production';
// log request URL;
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url} ...`);
  var start = new Date().getTime(), execTime;
  await next();
  execTime = new Date().getTime() - start;
  ctx.response.set('X-Response-Time', `${execTime}ms`);
});

(async () => {
  
  // var test = await Test.create({
  //    Article: 'liuwenhao',
  //    gender: false,
  //    title: 'lengque-' + Date.now() + '@gmail.com',
  //    author: '速度发货速度 '
  // });
  

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

// static file support
if (!isProduction) {
  let staticFiles = require('./static-files');
  app.use(staticFiles('/public/', __dirname + '/public'));
}

// bodyParser
app.use(bodyParser());

// add nunjucks as view;
app.use(template('views', {
  noCache: !isProduction,  //断当前环境是否是production环境。如果是，就使用缓存，如果不是，就关闭缓存
  watch: !isProduction
}));

// 使用中间件位路由 add router middleware;
app.use(controller());

app.listen(8080);
console.log('app started at port 8080...');