// Redux
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// In-Project
import patientsReducer from "../home/PatientSlice";
import studiesReducer from "../detail/StudySlice";
import glucoseReducer from "../detail/GlucoseSlice";

const persistConfig = {
  key: 'root',
  storage,
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