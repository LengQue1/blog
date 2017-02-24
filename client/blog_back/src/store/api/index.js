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
  return request.get(`${root}/${model}`, { params: {params} }).then( response => {
    return response.data;
  })
};

api.post = (model, form) => {
  return request.post(`${root}/${model}`, form).then( response => {
    return response.data
  })
};

api.fetchById = (model, id, params) => {
  return request.get(`${root}/${model}/${id}`, { params: {params} }).then(response => {
    return response.data;
  })
};

api.patchById = (model, id, form) => {
  return request.patch(`${root}/${model}/${id}`, form).then(response => {
    return response.data;
  })
};

api.deleteById = (model, id) => {
  return request.delete(`${root}/${model}/${id}`).then(response => {
    return response.data;
  })
};
