import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
})

export type CodeTesterState = ReturnType<typeof rootReducer>;

export default rootReducer;