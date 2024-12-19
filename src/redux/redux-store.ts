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



let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    infoPage: infoReducer,
    header: headerReducer
});

type RootReducerType = typeof rootReducer; //(state: GLOBAL_STATE_TYPE): GLOBAL_STATE_TYPE => state;
export type AppStateType = ReturnType<RootReducerType>;




// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(rootReducer,  composeEnhancers(applyMiddleware(thunk)));



// @ts-ignore
window.__store__ = store;

export default store;





