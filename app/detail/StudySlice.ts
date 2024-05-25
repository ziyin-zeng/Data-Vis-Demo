// Redux
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

// 3rd party library
import axios from "axios";

// In-Project
import StudyType from "../type/StudyType";

const initialState : {
    studies : StudyType[]
    status : string,
    error : string | undefined
} = {
    studies : [],
    status : "idle",
    error : undefined
}

export const fetchStudies = createAsyncThunk('studies/fetchStudies', async () => {
    const response = await axios.get("https://6651e96220f4f4c4427920ed.mockapi.io/api/studies")
    return response.data;
});

const studySlice = createSlice({
    name : "studies",
    initialState,
    reducers : {

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

export const selectStudies = (state : RootState) => state.studies.studies;
export const selectStudyById = (state : RootState, studyId : string) => state.studies.studies.find(s => s.id === studyId);
