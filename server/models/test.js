const db = require('../db');

module.exports = db.defineModel('Test',{
  Article: db.STRING(300),
  title: db.STRING(100),
  author: db.STRING(100),
  gender: db.BOOLEAN
});