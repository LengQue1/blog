import request from 'superagent';

const host = typeof location === 'undefined'
   ? process.env.NODE_ENV === 'production'
   ? 'http://localhost:3000'
   : 'http://localhost:8080/proxyPrefix'
   : '/proxyPrefix';

const store = {};

store.fetchTest = () => {
  return request.get(`${host}/api/test`)
	 .then((res) => {
	   return res.text;
	 }, (err) => {
	   console.log(err);
	 })
}

export default store;