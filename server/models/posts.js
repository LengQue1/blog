const db = require('../db');
const categories = require('./categories');
const posts = db.defineModel('posts',{
  title: db.STRING(255),
  content: db.TEXT,
  markdownContent: db.TEXT,
  read_num: db.INTEGER(10),
  summary: db.TEXT,
  pathName: db.STRING(255)
});

posts.belongsTo(categories);
module.exports = posts;