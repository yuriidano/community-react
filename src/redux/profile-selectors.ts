import { AppStateType } from "./redux-store";

export const getStatus = (state: AppStateType) => {
    return state.profilePage.status;
}

export const getAutoRizedUserId = (state: AppStateType) => {
    return state.auth.userId;
}

export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}

export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts;
}
export const getProfile = (state: AppStateType) => {
    return state.profilePage.profile;
}
export const getIsUpdateProgress = (state: AppStateType) => {
    return state.profilePage.isUpdateProgress;
}

export const getProfileMy = (state: AppStateType) => {
    return state.infoPage.profileInfo;
}

