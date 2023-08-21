import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
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

const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const create = () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};
export default create