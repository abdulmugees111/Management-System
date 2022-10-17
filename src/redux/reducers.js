import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import user from './user/reducers'
import settings from './settings/reducers'
import projects from './projects/reducers'

export default history =>
  combineReducers({
    router: connectRouter(history),
    user,
    settings,
    projects,
  })
