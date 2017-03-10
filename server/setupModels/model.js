const fs = require('fs');
const path = require('path');
const db = require('./db');
let files = fs.readdirSync(path.resolve(__dirname, '../models'));

// 找到model 目录下的.js文件
let js_files = files.filter((f) => {
  return f.endsWith('.js');
}, files);


// 获取.js文件
for (let f of js_files) {
  console.log(`import model from file ${f}`);
  let name = f.substring(0, f.length - 3);
  module.exports[name] = require(path.resolve(__dirname, '../models') + '/' + f);
}

// 建立model associate
const models = db.sequelize.models;
Object.values(models)
  .filter(model => model.associate)
  .forEach(model => model.associate(models));


module.exports.sequelize = db.sequelize;


