"use client";

import { Provider } from "react-redux";
import { store, persistor } from "@/app/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { ReactNode, useEffect, useState } from "react";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
