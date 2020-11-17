import { all } from "redux-saga/effects";
import { handleExampleSaga } from "./handleLogin";

export function* exampleSaga() {
    yield all([handleExampleSaga()]);
}