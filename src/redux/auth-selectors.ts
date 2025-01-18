import { AppStateType } from "./redux-store";

// export const getIsAuth = (state: AppStateType) => {
//     return state.auth.isAuth;
// }

// export const getCaptcha = (state: AppStateType) => {
//     return state.auth.captcha;
// }


export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth
};

export const getCaptcha = (state: AppStateType) => {
    return state.auth.captcha
}