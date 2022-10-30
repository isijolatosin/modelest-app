import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./src/slices/appSlices";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: {
    app: appReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
