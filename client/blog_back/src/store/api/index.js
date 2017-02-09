import request from 'axios'

const root = `/proxyPrefix/api`

const api = {}

export default api
api.request = request;

api.login = (conditions) => {
	return request.post(`${root}/admin/login`, conditions)
};

api.logout = (conditions) => {
  return request.post(`${root}/admin/logout`, conditions)
};

api.fetchList = (model, params) => {
  return request.get(`${root}/${model}`, { params: params }).then( response => {
    return response.data;
  })
};
