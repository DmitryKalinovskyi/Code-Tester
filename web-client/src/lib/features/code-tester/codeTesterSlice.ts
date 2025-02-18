import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CodeTestRequest from "./types/CodeTestRequest";
import CodeTestResponse from "./types/CodeTestResponse";

interface CodeTesterSliceState {
    isTesting: boolean;
    executionError?: string | null;
    codeTestResponse?: CodeTestResponse | null;
}

const initialState: CodeTesterSliceState = {
    isTesting: false,
};

const codeTesterSlice = createSlice({
    name: "codeTester",
    initialState,
    reducers: {
        codeTest: (state, _action: PayloadAction<CodeTestRequest>) => {
            state.isTesting = true;
            state.executionError = null;
            state.codeTestResponse = null;
        },

        codeTestSuccess: (state, action: PayloadAction<CodeTestResponse>) => {
            state.isTesting = false;
            state.codeTestResponse = action.payload;
        },

        codeTestFailure: (state, _action: PayloadAction<any>) => {
            state.isTesting = false;
        },

        codeExecutionFailure: (state, action: PayloadAction<string>) => {
            state.isTesting = false;
            state.executionError = action.payload;
        },
    },
});

export const codeTesterReducer = codeTesterSlice.reducer;
export const {
    codeTest,
    codeExecutionFailure,
    codeTestFailure,
    codeTestSuccess,
} = codeTesterSlice.actions;
