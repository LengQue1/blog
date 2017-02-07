const db = require('../db');

module.exports = db.defineModel('Users',{
  email: {
    type: db.STRING(50),
	unique: true
  },
  password: db.STRING(100),
  username: db.STRING(100),
  token: { type: db.STRING(200), allowNull: true },
});