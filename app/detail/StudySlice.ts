// Redux
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// 3rd party library
import axios from "axios";

// In-Project
import StudyType from "../type/StudyType";

const initialState: {
    studies: StudyType[]
    status: string,
    error: string | undefined
} = {
    studies: [],
    status: "idle",
    error: undefined
}

export const fetchStudies = createAsyncThunk('studies/fetchStudies', async (patientId: number) => {
    const response = await axios.get(`https://5kzf0lo9ee.execute-api.eu-west-3.amazonaws.com/study/patient/${patientId}`)
    return response.data;
});

const studySlice = createSlice({
    name: "studies",
    initialState,
    reducers: {
        setFetchStudyStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload;
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchStudies.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchStudies.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.studies = action.payload;
            })
            .addCase(fetchStudies.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export default studySlice.reducer;

export const { setFetchStudyStatus } = studySlice.actions;

export const selectStudies = (state: RootState) => state.studies.studies;
export const selectStudyById = (state: RootState, studyId: number) => state.studies.studies.find(s => s.id === studyId);
