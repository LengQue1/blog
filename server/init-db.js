require('babel-core/register')({
  presets: ['stage-3']
});

const model = require('./model.js');
const db = require('./db.js');
db.sync({force: false}).then(() => {
  console.log('init db ok');
  process.exit(0);
}).catch((e) => {
  console.log(e);
})


