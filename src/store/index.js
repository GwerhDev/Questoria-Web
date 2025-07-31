import { configureStore } from '@reduxjs/toolkit';
import accountReducer from './accountSlice';
import adventureReducer from './adventureSlice';

export const store = configureStore({
  reducer: {
    account: accountReducer,
    adventures: adventureReducer,
  },
});