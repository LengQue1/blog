const db = require('../db');

const categories = db.defineModel('categories',{
  name: db.STRING(100),
});

module.exports = categories;