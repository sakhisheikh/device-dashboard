import { combineReducers } from 'redux';

import readings from './readings';

const rootReducer = combineReducers({
  readings,
});

export default rootReducer;
