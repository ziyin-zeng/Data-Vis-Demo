// Redux
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// In-Project
import patientsReducer from "../home/PatientSlice";
import studiesReducer from "../detail/StudySlice";
import glucoseReducer from "../detail/GlucoseSlice";

// Work around from : https://github.com/vercel/next.js/discussions/15687#discussioncomment-45319
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, patientsReducer);

const store = configureStore({
  reducer: {
    patients: persistedReducer,
    studies: studiesReducer,
    glucoseData: glucoseReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
});

const persistor = persistStore(store);

export { store, persistor };

// get the type of [RootState] and [AppDispatch] from [store] itself
// type of [RootState] = { patients : PatientsState }
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;