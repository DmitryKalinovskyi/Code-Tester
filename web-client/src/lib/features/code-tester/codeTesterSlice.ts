import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CodeTestRequest from "./types/CodeTestRequest";
import CodeTestResponse from "./types/CodeTestResponse";

interface CodeTesterSliceState {
    isTesting: boolean;
    executionError?: string | null;
    testError?: string | null;
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
            state.testError = null;
        },

        cancelCodeTest: (state) => {
            state.isTesting = false;
            state.codeTestResponse = {
                output: "Test is canceled.",
            };
        },

        codeTestSuccess: (state, action: PayloadAction<CodeTestResponse>) => {
            state.isTesting = false;
            state.codeTestResponse = action.payload;
        },

        codeTestFailure: (state, action: PayloadAction<string>) => {
            state.isTesting = false;
            state.testError = action.payload;
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
    cancelCodeTest,
} = codeTesterSlice.actions;
