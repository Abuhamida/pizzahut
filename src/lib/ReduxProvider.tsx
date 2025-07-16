// src/lib/ReduxProvider.tsx
"use client";

import { Provider } from "react-redux";
import { store, persistor } from "@/app/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode } from "react";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
