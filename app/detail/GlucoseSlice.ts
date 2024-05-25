// 3rd party library
import axios from "axios";

// Redux
import { RootState } from "../store/store";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// In-Project
import GlucoseDataType from "../type/GlucoseDataType";

const initialState: {
    status: string,
    error: string | undefined,
    glucoseData: GlucoseDataType[],
} = {
    status: 'idle',
    error: undefined,
    glucoseData: [],
}

export const fetchGlucoseData = createAsyncThunk('glucoseData/fetchGlucoseData', async (studyId: string) => {
    // Each study has a set of glucose data
    const response = await axios.get(`https://6651e96220f4f4c4427920ed.mockapi.io/api/studies/${studyId}/glucoseData`);
    return response.data;
});

const glucoseSlice = createSlice({
    name: "glucoseData",
    initialState,
    reducers: {
        setFetchStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        },
        emptyGlucoseData: (state) => {
            state.glucoseData = [];
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchGlucoseData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchGlucoseData.fulfilled, (state, action) => {
                state.status = "succeded";
                state.glucoseData = action.payload;
            })
            .addCase(fetchGlucoseData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export default glucoseSlice.reducer;

export const { setFetchStatus, emptyGlucoseData } = glucoseSlice.actions;

export const selectGlucoseData = (state: RootState) => state.glucoseData.glucoseData;