import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsSliceState {
    isSettingsModalShown: boolean;
}

const initialState: SettingsSliceState = {
    isSettingsModalShown: false,
};

const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setSettingsModalVisiblity: function (
            state,
            action: PayloadAction<boolean>
        ) {
            state.isSettingsModalShown = action.payload;
        },
    },
});

export const settingsReducer = settingsSlice.reducer;
export const { setSettingsModalVisiblity } = settingsSlice.actions;
