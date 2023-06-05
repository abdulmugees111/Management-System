import { all, takeEvery, put, call, select } from 'redux-saga/effects'
// import { notification } from 'antd'
import { history } from '../../index'
// import * as firebase from '../../services/'
import * as jwt from '../../services/jwt'
import actions from './actions'
import store from 'store'
import { toast } from 'react-toastify';
import i18next from 'i18next'
import { useState } from 'react'
import { takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';



const mapAuthProviders = {
  jwt: {
    login: jwt.login,
    register: jwt.register,
    currentAccount: jwt.currentAccount,
    logout: jwt.logout,
  },
}

export function* LOGIN({ payload }) {
  
  const { name, passcode } = payload

  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { authProvider: autProviderName } = yield select(state => state.settings)
  const success = yield call(mapAuthProviders[autProviderName].login, name, passcode)
  if (success) {
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
    yield history.push('/dashboard')
   toast.success("Logged in successfully")
  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
    toast.error("Login error! Please check credentials")
  }
}

export function* REGISTER({ payload }) {
  const { email, password, name } = payload
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
  })
  const { authProvider } = yield select(state => state.settings)
  const success = yield call(mapAuthProviders[authProvider].register, email, password, name)
  if (success) {
    yield put({
      type: 'user/LOAD_CURRENT_ACCOUNT',
    })
    yield history.push('/')

  }
  if (!success) {
    yield put({
      type: 'user/SET_STATE',
      payload: {
        loading: false,
      },
    })
  }
}

export function* LOAD_CURRENT_ACCOUNT() {
  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: true,
    },
    
  })
  
  const { authProvider } = yield select(state => state.settings)
  const response = yield call(mapAuthProviders[authProvider].currentAccount)
  if (response) {
    
    const { id, email, name, partner_id ,lang} = response;
    yield put({
      type: 'user/SET_STATE',
      payload: {
        id,
        name,
        email,
        partner_id,
        authorized: true,
        lang
      },
    })
  }
  
  if (response.id==2){
    yield put(push('/user-profile'));
 
  }

  yield put({
    type: 'user/SET_STATE',
    payload: {
      loading: false,
    },
  })
}

export function* LOGOUT() {
  const { authProvider } = yield select(state => state.settings)
  yield call(mapAuthProviders[authProvider].logout)
  yield put({
    type: 'user/SET_STATE',
    payload: {
      id: '',
      name: '',
      role: '',
      email: '',
      avatar: '',
      authorized: false,
      loading: false,
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(actions.LOGIN, LOGIN),
    takeEvery(actions.REGISTER, REGISTER),
    takeEvery(actions.LOAD_CURRENT_ACCOUNT, LOAD_CURRENT_ACCOUNT),
    takeEvery(actions.LOGOUT, LOGOUT),
    store.get('uid') && LOAD_CURRENT_ACCOUNT(), // run once on app load to check user auth
    
  ])

}
