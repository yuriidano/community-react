import { applyMiddleware, combineReducers, compose, legacy_createStore } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sitebarReducer from "./sitebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { thunk } from 'redux-thunk'
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";




let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sitebarPage: sitebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = legacy_createStore(reducers,  composeEnhancers(applyMiddleware(thunk)));


window.__store__ = store;

export default store;





