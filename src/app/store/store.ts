// src/app/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slices/categorySlice";
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
