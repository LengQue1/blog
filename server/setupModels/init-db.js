require('babel-core/register')({
  presets: ['stage-3']
});

const model = require('./model');
const db = require('./db.js');

db.sync().then(() => {
  console.log('init db ok');
  process.exit(0);
}).catch((e) => {
  console.log(e);
})


