const db = require('../setupModels/db');
const posts = db.defineModel('posts',{
  title: db.STRING(255),
  content: db.TEXT,
  markdownContent: db.TEXT,
  read_num: db.INTEGER(10),
  summary: db.TEXT,
  pathName: db.STRING(255)
},{
  associate (models) {
    posts.belongsTo(models.categories);
    posts.belongsToMany(models.tags, {'through': 'Tagging'});
  }
});

module.exports = posts;