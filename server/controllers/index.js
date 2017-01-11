// var fn_index = async (ctx, next) => {
//   ctx.response.body = `<h1>Index</h1>
//     <form action="/signin" method="post">
//         <p>Nmae: <input type="text" name="name" value="koa" /> </p>
//         <p>Pssword: <input type="password" name="password" /></p>
//         <p><input type="submit" value="SUBMIT"></p>
//     </form>`;
// };

// var fn_signin = async (ctx, next) => {
//   let name = ctx.request.body.name || '';
//   let password = ctx.request.body.password || '';
//   console.log(`signin with name: ${name}, password: ${password}`);
//   if (name === 'koa' && password === '123456') {
// 	ctx.response.body = `<h1>Welcome, ${name}！</h1>`
//   } else {
// 	ctx.response.body = `<h1>Login failed!</h1><p><a href="/">Try again</a></p>`
//   }
// };

module.exports = {
  'GET /': async (ctx, next) => {
    ctx.render('index.html',{
      title: 'Welcome'
    });
  }
  // 'POST /signin': fn_signin
}