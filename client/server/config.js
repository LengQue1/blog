let request = require('superagent');
let siteUrl = 'http://localhost:8080';
let title = 'Blog';
let description = '';

function flushOption() {
  return request.get('localhost:3000/api/option').then(res => {
    let options = res.body.reduce((prev, curr) => {
      prev[curr.key] = curr.value;
	  return prev;
	}, {});
	siteUrl = options['siteUrl'];
	title = options['title'];
	description = options['description']
  });
}

Object.defineProperty(exports, 'title', {
  enumerable: true,
  get: () => title,
  set: (value) => title = value,
});

Object.defineProperty(exports, 'siteUrl', {
  enumerable: true,
  get: () => siteUrl,
  set: (value) => siteUrl = value,
});

Object.defineProperty(exports, 'description', {
  enumerable: true,
  get: () => description,
  set: (value) => description = value,
});

Object.defineProperty(exports, 'flushOption', {
  enumerable: true,
  get: () => flushOption
});
