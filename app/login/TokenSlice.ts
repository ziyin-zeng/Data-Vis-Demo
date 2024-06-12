// Redux 
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from '@/app/store/store';

const initialState: {
    accessToken: string
} = {
    accessToken: ""
}

const tokenSlice = createSlice({
    name: "token",
    initialState: initialState,
    reducers: {
        // PayloadAction could be the type of the payload content within an action
        addToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
        },
    },
});

export default tokenSlice.reducer;

export const { addToken } = tokenSlice.actions;

// customized Selector, tell TS that state is RootState, and could do some basic query
export const selectToken = (state: RootState) => state.token.accessToken;  