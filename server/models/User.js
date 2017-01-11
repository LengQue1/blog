const db = require('../db');

module.exports = db.defineModel('Users',{
  email: {
    type: db.STRING(100),
	unique: true
  },
  password: db.STRING(100),
  name: db.STRING(100),
  gender: db.BOOLEAN
});