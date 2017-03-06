const db = require('../db');

module.exports = db.defineModel('categories',{
  name: db.STRING(100),
});