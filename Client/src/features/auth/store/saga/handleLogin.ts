/*-------------VENDORS-------------------*/
import axios, { AxiosResponse } from "axios";
import { defineAction } from "rd-redux-utils";
import { push } from "react-router-redux";
import { put, takeEvery } from "redux-saga/effects";
import { API_SERVERS } from "../../../../config";
/*-------------HELPERS-------------------*/
// import { MAIN_ASSET_URL } from "../../../home";
/*-------------MODELS-------------------*/
import { ExampleModel } from "../../components/ExampleForm";
/*-------------ACTIONS-------------------*/
import { exampleAction } from "../actions";
/*-------------REDUCERS-------------------*/
import { AuthAppState } from "../reducer";

export const loginAtServerStartedAction = defineAction<AuthAppState>(
  "AUTH_LOGIN_AT_SERVER_STARTED"
);
export const loginAtServerCompletedAction = defineAction<AuthAppState>(
  "AUTH_LOGIN_SUCCESS"
);

export function* handleExampleSaga() {
  yield takeEvery(exampleAction.TYPE, function* (
    action: typeof exampleAction.typeOf.action
  ) {
    let testModel: ExampleModel = action;

    try {
      yield put(
        loginAtServerStartedAction({
          status: "running",
        })
      );
      const response: AxiosResponse = yield axios.post(
        `${API_SERVERS}/api/example/test`,
        testModel
      );

      if (response.status === 200) {
      }

      yield put(
        loginAtServerCompletedAction({
          status: "success",
        })
      );

      yield put(push("/home"));
    } catch (e) {
      yield put(
        loginAtServerCompletedAction({
          status: "error",
          error: e.toString(),
        })
      );
    }
  });
}
