import { stopSubmit } from "redux-form";
import { authApi } from "../api/api";

const SET_USER_AUTH = 'auth/SET-USER-AUTH';
const SET_CAPTCHA = 'auth/SET-CAPTCHA';




let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captcha: null as null | string
};

type InitialStateType = typeof initialState;
 
const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.payload,
            }
        case SET_CAPTCHA:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    };
};

type SetUserAuthTypePayload = {
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean
}

type SetUserAuthType = {
    type: typeof SET_USER_AUTH,
    payload: SetUserAuthTypePayload
}
const setUserAuth = (userId: number | null, email: string | null, login: string | null, boollian: boolean): SetUserAuthType => ({type: SET_USER_AUTH, payload: {userId, email, login, isAuth : boollian}});


type SetCaptchaType = {
    type: typeof SET_CAPTCHA,
    payload: {captcha: string | null}
}
const setCaptcha = (captcha: string | null): SetCaptchaType => ({type: SET_CAPTCHA, payload: {captcha}});




export const authMe = () => async (dispatch: any) => {
    let data = await authApi.authMe()
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setUserAuth(id, email, login, true));
    }
}

export const login = (email: string, password: String, rememberMe: boolean, captcha: any) => async (dispatch: any) => {
    let data = await authApi.login(email, password, rememberMe, captcha);
    if (data.resultCode === 0) {
        dispatch(authMe());
        dispatch(setCaptcha(null))
    } else {
        if(data.resultCode === 10) {
            dispatch(requestCaptcha())
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'some error';
            dispatch(stopSubmit('login', { _error: message }))
        }
    }
}

export const logout = () => async (dispatch: any) => {
    let data = await authApi.logout()
    if (data.resultCode === 0) {
        dispatch(setUserAuth(null, null, null, false));
    }
}

export const requestCaptcha = () => async (dispatch: any) => {
    let data = await authApi.captcha();
    dispatch(setCaptcha(data))
}

export default authReducer;