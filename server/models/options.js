const db = require('../setupModels/db');

const options = db.defineModel('options',{
  key: db.STRING(255),
  value: db.TEXT,
});

module.exports = options;