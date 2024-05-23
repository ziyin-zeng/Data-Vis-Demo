import { configureStore } from "@reduxjs/toolkit";
import patientsReducer from "../home/PatientsContext";

const store = configureStore({
  reducer: {
    patients: patientsReducer,
  },
});

export default store;
