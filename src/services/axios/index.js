import axios from 'axios'
import store from 'store'

const apiClient = axios.create({
  // baseURL: 'https://app.idara.io/api/',
  baseURL: 'http://127.0.0.1:8043/api/',
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
  headers: {'Content-Type': 'text/html'}
})

apiClient.interceptors.request.use(request => {
  const access_token = store.get('access_token')
  // request.headers.contentType
  if (access_token) {
    request.headers.access_token = access_token
    // request.headers.Authorization = `Bearer ${access_token}`
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  console.log(error)
  const { data } = response
  if (data) {
  // custom code for showing error
  }
})

export default apiClient
