const db = require('../db');

module.exports = db.defineModel('posts',{
    user_id: db.INTEGER(10),
    title: db.STRING(255),
    category: db.STRING(100),
    summary: db.STRING(512),
    content: db.TEXT
});