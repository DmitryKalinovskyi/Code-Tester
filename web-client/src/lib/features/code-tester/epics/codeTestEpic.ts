import { Action } from "redux";
import { CodeTesterState } from "../../../state/rootReducer";
import { Epic, ofType } from "redux-observable";
import {
    codeExecutionFailure,
    codeTest,
    codeTestFailure,
    codeTestSuccess,
} from "../codeTesterSlice";
import { catchError, map, of, switchMap } from "rxjs";
import codeTesterApi from "../../../api/codeTesterApi";
import CodeTestRequest from "../types/CodeTestRequest";
import { PayloadAction } from "@reduxjs/toolkit";
import CodeTestResponse from "../types/CodeTestResponse";

const codeTestEpic: Epic<Action, Action, CodeTesterState> = (action$) =>
    action$.pipe(
        ofType(codeTest.type),
        switchMap((action: PayloadAction<CodeTestRequest>) =>
            codeTesterApi
                .post<CodeTestResponse>({
                    url: "/code-tester",
                    body: action.payload,
                })
                .pipe(
                    map((ajaxResponse) =>
                        codeTestSuccess(ajaxResponse.response)
                    ),
                    catchError((error) => {
                        if (error.status == "400") {
                            return of(codeExecutionFailure(error.response.error));
                        }

                        return of(codeTestFailure(error.message));
                    })
                )
        )
    );

export default codeTestEpic;
