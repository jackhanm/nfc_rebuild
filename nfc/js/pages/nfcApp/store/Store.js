
import {createStore, combineReducers, applyMiddleware} from 'redux'
import reduders from '../reducer'
import thunkMiddleware from 'redux-thunk'

const composedReducer = combineReducers(reduders)

const Store = createStore(
  composedReducer,
  applyMiddleware(thunkMiddleware)
)

export default Store