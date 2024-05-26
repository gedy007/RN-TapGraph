import { configureStore } from '@reduxjs/toolkit';
import asyncStorageMiddleware from './middleware/asyncStorageMiddleware';
import marketSlice from './market/marketSlice';

if (__DEV__) {
  require('../../ReactotronConfig');
}

export const store = configureStore({
  reducer: {
    market: marketSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(asyncStorageMiddleware),
});

export default store;
