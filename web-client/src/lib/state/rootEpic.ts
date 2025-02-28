import { combineEpics, Epic } from "redux-observable";
import { CodeTesterState } from "./rootReducer";
import { Action } from "@reduxjs/toolkit";
import codeTestEpic from "../features/code-tester/epics/codeTestEpic";
import { storeActionEmitterEpic } from "./storeAction$";

const rootEpic: Epic<Action, Action, CodeTesterState> = combineEpics(
    storeActionEmitterEpic,
    codeTestEpic
);

export default rootEpic;
