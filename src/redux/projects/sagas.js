import { all, put, call, takeEvery } from 'redux-saga/effects'
import {getAllProjects} from '../../services/projects/index'
import actions from './actions'

export function* GET_ALL_PROJECTS() {
  yield put({
    type: actions.SET_STATE,
    payload: {
      isLoading: true,
    },
  })

  const allProjects = yield call(getAllProjects)

  yield put({
    type: actions.SET_STATE,
    payload: {
      data: allProjects,
      isLoading: false,
    },
  })
}

export default function* root() {
  yield all([
    takeEvery(actions.GET_ALL_PROJECTS, GET_ALL_PROJECTS),
  ])
}
