import { combineEpics, Epic } from "redux-observable";
import { CodeTesterState } from "./rootReducer";
import { Action } from "@reduxjs/toolkit";

const rootEpic: Epic<Action, Action, CodeTesterState> = combineEpics(

);

export default rootEpic;