import request from 'superagent';

const host = typeof location === 'undefined'
   ? process.env.NODE_ENV === 'production'
   ? 'http://localhost:3000'
   : 'http://localhost:8080/proxyPrefix'
   : '/proxyPrefix';


const store = {};

store.fetchById = (model, id, params) => {
  return request.get(`${host}/api/${model}/${id}?params= ${JSON.stringify(params)}`).then((response) => {
  	return response.body;
	}, (err) => console.log(err));
};

store.fetch = (params, model) => {
	return request.get(`${host}/api/${model}?params= ${JSON.stringify(params)}`).then((response)=> {
		return response.body
	}, (err) => console.log(err))
};

export default store;