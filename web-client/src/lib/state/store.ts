import { Action, configureStore, Tuple } from "@reduxjs/toolkit";
import rootReducer, { CodeTesterState } from "./rootReducer";
import { createEpicMiddleware, EpicMiddleware } from "redux-observable";
import rootEpic from "./rootEpic";

const epicMiddleware: EpicMiddleware<Action, Action, CodeTesterState> = createEpicMiddleware();

export const store = configureStore({
    reducer: rootReducer,
    middleware: () => new Tuple(epicMiddleware)
});

epicMiddleware.run(rootEpic);

export type AppDispatch = typeof store.dispatch;
