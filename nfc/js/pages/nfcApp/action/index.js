
import {Constants} from '../constants'

const CounterAction = {
  increase() {
    return {
      type: Constants.INCREASE
    }
  },

  decrease(text) {
    return {
      type: Constants.DECREASE,
      text :text
    }
  }
}

const TodoAction = {

  addItem(dispatch, value) {
    return dispatch({
      type: Constants.ADDITEM,
      value
    })
  },

  deleteItem(dispatch, index) {
    return dispatch({
      type: Constants.DELETEITEM,
      index: index
    })
  },
  checkItem(dispatch, index) {
    return dispatch({
      type: Constants.CHECKITEM,
      index: index
    })
  }
}

export {CounterAction, TodoAction}