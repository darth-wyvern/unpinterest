import { configureStore } from '@reduxjs/toolkit';
import imageReducer from '../image-management/imageSlice'
import loggerMiddleware from './middleware/logger';
import authReducer from '../Auth/AuthSlice'

export const store = configureStore({
  reducer: {
    image: imageReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.config', 'payload.request', 'error', 'meta.arg'],
      },
    }).concat(loggerMiddleware),
});
