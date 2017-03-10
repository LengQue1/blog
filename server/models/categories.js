const db = require('../setupModels/db');

const categories = db.defineModel('categories',{
  name: {
    type: db.STRING(100),
    unique: true
  },
}, {
    associate (models) {
      categories.hasMany(models.posts);
    }
});

module.exports = categories;