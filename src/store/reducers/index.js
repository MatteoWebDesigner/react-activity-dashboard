import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import sideBar from './sideBar';
import modalActivity from './modalActivity';
import activityReceipts from './activityReceipts';

export default combineReducers({
  routing: routerReducer,
  sideBar,
  modalActivity,
  activityReceipts
});