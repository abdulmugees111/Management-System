import apiClient from '../axios'
import store from 'store'

export async function login(username, password) {
  return apiClient
    .post('/auth/get_tokens', {
      username,
      password,
    })
    .then(response => {
      if (response) {
        const { access_token, refresh_token, uid } = response.data
        if (access_token) {
          store.set('access_token', access_token)
          store.set('refresh_token', refresh_token)
          store.set('uid', uid)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function register(email, password, name) {
  return apiClient
    .post('/auth/register', {
      email,
      password,
      name,
    })
    .then(response => {
      if (response) {
        const { access_token } = response.data
        if (access_token) {
          store.set('access_token', access_token)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function currentAccount() {

  const uid = store.get('uid')
  
  return apiClient
    .get(`/res.users/${uid}`)
    .then(response => {
      if (response) {
        // const { access_token } = response.data
        // if (access_token) {
        //   store.set('access_token', access_token)
        // }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function logout() {
  return apiClient
    .get('/auth/logout')
    .then(() => {
      store.remove('uid')
      store.remove('access_token')
      store.remove('refresh_token')
      return true
    })
    .catch(err => console.log(err))
}
