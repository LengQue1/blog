const nunjucks = require('nunjucks');

function createEnv(path, opts) {
  var autoescape = opts.autoescape && true,
	 noCache = opts.noCache || false,
	 watch = opts.watch || false,
	 throwOnUndefined = opts.throwOnUndefined || false,
	 env = new nunjucks.Environment(
		new nunjucks.FileSystemLoader('views', {
		  noCache: noCache,
		  watch: watch
		}),{
		  autoescape: autoescape,
		  throwOnUndefined: throwOnUndefined
		}
	 );
  if (opts.filters) {
	for (var f in opts.filters) {
	  env.addFilter(f, opts.filters[f]);
	}
  }
  return env;
}

function template(path, opts) {
  // 创建 Nunjuks 的env对象;
  var env = createEnv(path, opts);
  return async (ctx, next) => {
    // 给ctx绑定render函数;
	ctx.render = function (view, model) {
	  // 把render 后的内容赋值给response.body
	  ctx.response.body = env.render(view, Object.assign({}, ctx.state || {}, model || {}));
	  // 设置Content-Type
	  ctx.response.type = 'text/html';
	};
	// 继续处理请求
	await next();
  };
}


module.exports = template;