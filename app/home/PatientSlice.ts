// 3rd party library
import axios from "axios";

// Redux 
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from '@/app/store/store'

// In-Project
import PatientType from "@/app/type/PatientType";

// State of [patients] is no longer a single array with patient profil,
// State of [patients] now contains the status of Promise Object [fetchPatients]
// , such as 'idle' | 'loading' | 'succeeded' | 'failed'
const initialState: {
  patients: PatientType[],
  status: string,
  error: string | undefined
} = {
  patients: [],
  status: 'idle',
  error: undefined
}

// Function [createAsyncThunk] takes in the name of Async action, which is in this case 'patients/fetchPatients'
// Function [createAsyncThunk] takes in a callback arrow function, which fetchs data from a given API and returns a Promise Object
export const fetchPatients = createAsyncThunk('patients/fetchPatients', async () => {
  const response = await axios.get("https://664e4e1afafad45dfadfbc58.mockapi.io/api/patients");
  return response.data;
})

const patientSlice = createSlice({
  name: "patients",
  initialState: initialState,
  reducers: {
    // PayloadAction could be the type of the payload content within an action
    // !!! This reducer is no longer useful since [add patients] operation needs to be after the [fetchPatients] is fulfilled
    // !!! But I will still keep this one as an educative demo
    addPatients: (state, action: PayloadAction<PatientType[]>) => {
      state.patients.push(...action.payload);
    },
    setFetchPatientStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
  // Sometimes a certain action needs to be triggered under a certain case
  extraReducers(builder) {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        // !!! Could add some avoid replica logic
        state.patients = action.payload;

        // !!! The following will cause re-render, thus 2 size of result (no idea why)
        // state.patients = state.patients.concat(action.payload)
        // state.patients.push(...action.payload);

        // This one is OK
        // state.patients = [...action.payload];

        // Or return directly, it's also alright
        // return {
        //   ...state,
        //   status: 'succeeded',
        //   patients : action.payload,
        // }
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
});

export default patientSlice.reducer;

export const { addPatients, setFetchPatientStatus } = patientSlice.actions;

// customized Selector, tell TS that state is RootState, and could do some basic query
export const selectPatients = (state: RootState) => state.patients.patients;
export const selectPatientById = (state: RootState, patientId: string) => state.patients.patients.find(p => p.id === patientId);
