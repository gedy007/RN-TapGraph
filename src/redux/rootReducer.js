import { combineReducers } from '@reduxjs/toolkit';

import tabReducer from './tab/tabReducer';
import marketReducer from './market/marketReducer';

const rootReducer = combineReducers({
  tabReducer,
  marketReducer,
});

export default rootReducer;
