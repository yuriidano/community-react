import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, AnyAction, applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { thunk } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";
import infoReducer from "./info-reducer";
import headerReducer from "./header-reducer";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import chatReducer from './chat-reducer';
import usersFollowedReducer from './followed-reducer';


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    infoPage: infoReducer,
    header: headerReducer,
    chat: chatReducer,
    usersFollowedPage: usersFollowedReducer
});

type RootReducerType = typeof rootReducer; //(state: GLOBAL_STATE_TYPE): GLOBAL_STATE_TYPE => state;
export type AppStateType = ReturnType<RootReducerType>;

//тип для actions
type PropertyType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferActionsTypes<A extends {[key: string]: (...arg: Array<any>) => any}> = ReturnType<PropertyType<A>>;

//тип для dispatch 
export type AppDispatch = ThunkDispatch<AppStateType, unknown, AnyAction>

//useDispatch і useSelector з типами
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<AppStateType>()

//тип для thunk 
export type ThunkType<A extends {type: string, [key: string]: any}> = ThunkAction<void, AppStateType, unknown, A>;



type PropertyTestType<T> = T extends {[key: string]: infer U} ? U : never;
export type InferTestActionsTypes<T extends {[key: string]: (...arg: any[]) => any}> = ReturnType<PropertyTestType<T>>


// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));



// @ts-ignore
window.__store__ = store;

export default store;

