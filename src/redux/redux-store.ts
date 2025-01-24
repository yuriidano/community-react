import { ThunkAction } from 'redux-thunk';
import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { thunk } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import infoReducer from "./info-reducer";
import headerReducer from "./header-reducer";
import musicReducer from "./music-reducer";




let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    infoPage: infoReducer,
    header: headerReducer,
    musicPage: musicReducer,

});

type RootReducerType = typeof rootReducer; //(state: GLOBAL_STATE_TYPE): GLOBAL_STATE_TYPE => state;
export type AppStateType = ReturnType<RootReducerType>;

type PropertyType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<A extends {[key: string]: (...arg: Array<any>) => any}> = ReturnType<PropertyType<A>>;




export type ThunkType<P extends {type: string, [key: string]: any}> = ThunkAction<Promise<void>, AppStateType, {}, P>

























type PropertyTestType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferTestActionsTypes<T extends {[key: string]: (...arg: any[]) => any}> = ReturnType<PropertyTestType<T>>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));



// @ts-ignore
window.__store__ = store;

export default store;

