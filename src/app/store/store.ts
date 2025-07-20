// src/app/store/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import categoryReducer from "./slices/categorySlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import menuItemSlice from "./slices/menuItemSlice";
import orderReducer from "./slices/orderSlice";
import activeCategoryReducer from "./slices/activeCategorySlice";
import favoritesReducer from "./slices/favoritesSlice";
import searchModalReducer from "./slices/searchModalSlice"; 

// 👇 Combine reducers
const rootReducer = combineReducers({
  category: categoryReducer,
  menuItems: menuItemSlice,
  user: userReducer,
  cart: cartReducer,
  orders: orderReducer,
  activeCategory: activeCategoryReducer,
  favorites: favoritesReducer,
   searchModal: searchModalReducer, 
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart", "favorites"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
