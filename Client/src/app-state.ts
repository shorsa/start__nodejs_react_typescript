import { connectRouter, routerMiddleware } from "connected-react-router";
import { exampleReducer } from "features/example/store/reducer";
import { exampleSaga } from "features/example/store/saga";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { history } from "./history-instance";

//Reducers
const reducerMap = {
    router: connectRouter(history),
    example: exampleReducer,
};
const reducers = combineReducers(reducerMap);

//Sagas
function* appSaga() {
    yield all([exampleSaga()]);
}
const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = (window as any)["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;

export const appStore = createStore(
    reducers,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(appSaga);

type FirstArg<TFunction> = TFunction extends (arg: infer TArg, ...rest: any[]) => any ? TArg : any;
type State<TReducerMap> = {
    [P in keyof TReducerMap]: Exclude<FirstArg<TReducerMap[P]>, undefined>;
};

export type AppState = State<typeof reducerMap>;
