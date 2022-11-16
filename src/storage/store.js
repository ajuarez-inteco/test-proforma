import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth';
import captableReducer from '../features/captable';
import modelsReducer from '../features/models';
import shareholdersReducer from '../features/shareholders';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    captable: captableReducer,
    models: modelsReducer,
    shareholders: shareholdersReducer,
  },
});
