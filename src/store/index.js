import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './slices/gamesSlice';
import { loggerMiddleware } from './middleware/logger';

console.log('Initializing Redux store...');

// Configure the store with middleware and DevTools
const store = configureStore({
  reducer: {
    games: gamesReducer,
  },
  middleware: (getDefaultMiddleware) => {
    console.log('Setting up middleware...');
    return getDefaultMiddleware({
      serializableCheck: false,
    }).concat(loggerMiddleware);
  },
  devTools: {
    name: 'Math Game',
    trace: true,
    traceLimit: 25,
    features: {
      jump: true,
      skip: true,
      reorder: true,
      import: true,
      export: true,
    },
  },
});

// Log initial state
if (process.env.NODE_ENV === 'development') {
  console.log('%c Initial Redux State:', 'color: #4CAF50; font-weight: bold', store.getState());
  console.log('Games slice state:', store.getState().games);
  window.store = store;
}

export { store }; 