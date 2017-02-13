const db = require('../db');

module.exports = db.defineModel('posts',{
    title: db.STRING(255),
    category: db.STRING(100),
    content: db.TEXT,
    markdownContent: db.TEXT,
    read_num: db.INTEGER(10),
    summary: db.TEXT
});