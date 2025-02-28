import { Action } from "@reduxjs/toolkit";
import { filter, Subject, tap } from "rxjs";
import { CodeTesterState } from "./rootReducer";
import { Epic } from "redux-observable";

const storeAction$ = new Subject<Action>();

export const storeActionEmitterEpic: Epic<Action, Action, CodeTesterState> = (
    action$
) =>
    action$.pipe(
        tap((action) => storeAction$.next(action)),
        filter(() => false)
    );

export default storeAction$;
