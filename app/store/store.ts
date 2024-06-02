// Redux
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { storage } from "./webStorage";
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1"

// In-Project
import patientsReducer from "../home/PatientSlice";
import studiesReducer from "../detail/StudySlice";
import glucoseReducer from "../detail/GlucoseSlice";

const persistConfig = {
  key: 'root',
  storage: storage,
  autoMergeLevel1,    // by default it's level 1, but somehow doesn't work, so still have to indicate it here
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