import { AppStateType } from "./redux-store";

export const getInitialize = (state: AppStateType) => {
    return state.app.initialize;
};

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
};

export const getProfileMount = (state: AppStateType) => {
    return state.profilePage.profileMoutn;
};

export const getActiveMenu = (state: AppStateType) => {
    return state.header.activeMenu;
};

