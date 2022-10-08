import actions from './actions'

const initialState = {
  data: {
    count: -1,
    results:[]
  },
  isLoading: false,
}

export default function projectReducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_PROJECTS:
      return {...state, ...action.payload}
    case actions.GET_PROJECT:
      return {...state, ...action.payload}
    case actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
