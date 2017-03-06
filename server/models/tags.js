const db = require('../db');

module.exports = db.defineModel('tags',{
  name: db.STRING(100),
});