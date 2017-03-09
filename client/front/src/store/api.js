import request from 'superagent';

const host = typeof location === 'undefined'
   ? process.env.NODE_ENV === 'production'
   ? 'http://localhost:3000'
   : 'http://localhost:8080/proxyPrefix'
   : '/proxyPrefix';

const blogAPI = `${host}/api/posts`

const store = {};

store.fetch = (model, id, params) => {
  return request.get(`${host}/api/${model}/${id}?params= ${JSON.stringify(params)}`).then((response) => {
  	return response.body;
	}, (err) => console.log(err));
};

store.fetchPost = (params, model) => {
	console.log(model);
	console.log('---上面----')
	return request.get(`${host}/api/${model}?params= ${JSON.stringify(params)}`).then((response)=> {
		return response.body
	}, (err) => console.log(err))
};

export default store;