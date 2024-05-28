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
    const response = await axios.get(`https://zl0z5uram5.execute-api.eu-west-3.amazonaws.com/items`);
    return response.data;
});

const glucoseSlice = createSlice({
    name: "glucoseData",
    initialState,
    reducers: {
        setFetchGlucoseStatus: (state, action: PayloadAction<string>) => {
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

export const { setFetchGlucoseStatus, emptyGlucoseData } = glucoseSlice.actions;

export const selectGlucoseData = (state: RootState) => state.glucoseData.glucoseData;