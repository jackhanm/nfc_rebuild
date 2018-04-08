
import {Constants} from '../constants'

const defaultState = 1099

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case Constants.INCREASE:
      return state + 1
    case Constants.DECREASE:
      return state - 1
    default:
      return state
  }
}

export default reducer