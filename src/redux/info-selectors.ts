import { AppStateType } from "./redux-store";

export const getProfile = (state: AppStateType) => {
    return state.infoPage.profileInfo
};

export const getUserId = (state: AppStateType) => {
    return state.auth.userId;
}