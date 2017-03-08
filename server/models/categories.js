const db = require('../db');

const categories = db.defineModel('categories',{
  name: {
    type: db.STRING(100),
    unique: true
  },
});

module.exports = categories;