const db = require('../db');

const Tagging = db.defineModel('tagging',{
  type: {
    type: db.INTEGER()
  },
});

module.exports = Tagging;