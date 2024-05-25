// Redux
import { configureStore } from "@reduxjs/toolkit";

// In-Project
import patientsReducer from "../home/PatientSlice";
import studiesReducer from "../detail/StudySlice";
import glucoseReducer from "../detail/GlucoseSlice";

const store = configureStore({
  reducer: {
    patients: patientsReducer,
    studies : studiesReducer,
    glucoseData : glucoseReducer,
  },
});

export default store;

// get the type of [RootState] and [AppDispatch] from [store] itself
// type of [RootState] = { patients : PatientsState }
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;