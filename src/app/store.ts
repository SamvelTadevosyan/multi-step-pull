import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import pollReducer from '../features/poll/pollSlice';

export const store = configureStore({
  reducer: {
    poll: pollReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
