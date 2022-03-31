import { combineReducers } from 'redux';
import locations from './locationReducer.js';

const rootReducer = combineReducers({
  locations,
});

export default rootReducer;
