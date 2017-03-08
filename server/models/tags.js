const db = require('../db');

module.exports = db.defineModel('tags',{
  name: {
    type: db.STRING(100),
    unique: true
  },
});