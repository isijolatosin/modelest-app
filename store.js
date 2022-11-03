import { configureStore } from "@reduxjs/toolkit";
import persistedReducer from "./src/slices/appSlices";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: {
    app: persistedReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
