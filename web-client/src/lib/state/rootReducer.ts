import { combineReducers } from "@reduxjs/toolkit";
import { codeTesterReducer } from "../features/code-tester/codeTesterSlice";

const rootReducer = combineReducers({
    codeTester: codeTesterReducer
})

export type CodeTesterState = ReturnType<typeof rootReducer>;

export default rootReducer;