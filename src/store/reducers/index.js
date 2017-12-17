import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sideBar from './sideBar';

export default combineReducers({
  routing: routerReducer,
  sideBar
});