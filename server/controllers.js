const fs = require('fs');

// add url-route in. controllers;
function addMapping(router, mappings) {
  // 循环出每个js暴露的对象
  for (let url in mappings) {
    if (url.startsWith('GET')) {
      let path = url.substring(4);
	  router.get(path, mappings[url]);
	  console.log(`register URL mapping: GET ${path}`);
	} else if (url.startsWith('POST')) {
	  let path = url.substring(5);
	  router.post(path, mappings[url]);
	  console.log(`register URL mapping: POST ${path}`);
	} else if (url.startsWith('PUT')) {
	  let path = url.substring(4);
	  router.put(path, mappings[url]);
	  console.log(`register URL mapping: PUT ${path}`);
	} else if (url.startsWith('DELETE')) {
	  let path = url.substring(7);
	  router.del(path, mappings[url]);
	  console.log(`register URL mapping: DELETE  ${path}`);
	} else {
	  console.log(`invalid URL: ${url}`);
	}
  }
}

function addControllers(router, dir) {
  // 读取controllers 下面的所有.js文件名
  fs.readdirSync(__dirname + '/' + dir).filter((f) => f.endsWith('.js'))
	 .forEach((f) => {
	   console.log(`process controller: ${f}...`);
	   // 依次循环引入 每个.js的文件
	   let mappings = require(__dirname + '/' + dir + '/' + f);
	   // 把引入的js 依次注册路由映射
	   addMapping(router, mappings);
	 });
}

module.exports = function (dir) {
  let controllers_dir = dir || 'controllers',
	  router = require('koa-router')();
  // 传入koa-router
  addControllers(router, controllers_dir);
  return router.routes();
}