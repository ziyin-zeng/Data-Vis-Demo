import { createSlice } from "@reduxjs/toolkit";
import PatientType from "@/app/type/PatientType";

const patientsContext = createSlice({
  name: "patients",
  initialState: { patients: [] as PatientType[] },
  reducers: {
    addPatient: (state, newPatient) => {
      state.patients.push(newPatient.payload);
    },
  },
});

export default patientsContext.reducer;

export const { addPatient } = patientsContext.actions;
