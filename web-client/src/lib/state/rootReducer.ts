import { combineReducers } from "@reduxjs/toolkit";
import { codeTesterReducer } from "../features/code-tester/codeTesterSlice";
import { settingsReducer } from "../features/settings/settingsSlice";

const rootReducer = combineReducers({
    codeTester: codeTesterReducer,
    settings: settingsReducer,
});

export type CodeTesterState = ReturnType<typeof rootReducer>;

export default rootReducer;
