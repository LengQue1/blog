import request from 'axios'

const root = `/proxyPrefix/api`

const api = {}

export default api

api.login = (conditions) => {
	return request.post(`${root}/admin/login`, conditions)
}
