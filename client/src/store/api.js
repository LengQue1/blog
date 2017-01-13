import request from 'superagent';

const host = typeof location === 'undefined'
   ? process.env.NODE_ENV === 'production'
   ? 'http://localhost:3000'
   : 'http://localhost:8080/proxyPrefix'
   : '/proxyPrefix';

const store = {};

store.fetchTest = () => {
  return request.get('localhost:3000/api/test')
	 .then((res) => {
	   console.log(res.text);
	   return res.text;
	 }, (err) => {
	   console.log(err);
	 })
}

export default store;