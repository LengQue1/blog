const db = require('../db');

module.exports = db.defineModel('Users',{
  email: {
    type: db.STRING(50),
	unique: true
  },
  password: db.STRING(100),
  name: db.STRING(100),
  token: db.STRING(200),
  gender: db.BOOLEAN
});