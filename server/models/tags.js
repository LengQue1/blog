const db = require('../setupModels/db');
const tags = db.defineModel('tags',{
  name: {
    type: db.STRING(100),
    unique: true
  },
}, {
  associate(models) {
    tags.belongsToMany(models.posts, {'through': 'Tagging'});
  }
});

module.exports = tags;