import { stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../api/api";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes, ThunkType } from "./redux-store";
import { authApi, ResultCodeForCaptcha } from "../api/auth-api";



let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captcha: null as null | string
};

type InitialStateType = typeof initialState;
 
const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'auth/SET_USER_AUTH':
            return {
                ...state,
                ...action.payload,
            }
        case 'auth/SET_CAPTCHA':
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    };
}

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
    setUserAuth: (userId: number | null, email: string | null, login: string | null, boollian: boolean) =>
        ({ type: 'auth/SET_USER_AUTH', payload: { userId, email, login, isAuth: boollian } } as const),

    setCaptcha: (captcha: string | null) => ({ type: 'auth/SET_CAPTCHA', payload: { captcha } } as const),
    stopSubmit: (form: string, errors: any) => stopSubmit(form, errors)
}




type ThunkTypeAuth = ThunkType<ActionsTypes>;


export const authMe = ():ThunkTypeAuth => async (dispatch) => {
    let data = await authApi.authMe()
    if (data.resultCode === ResultCodeEnum.Succes) {
        let { id, email, login } = data.data;
        dispatch(actions.setUserAuth(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string):ThunkTypeAuth => async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.Succes) {
        dispatch(authMe());
        dispatch(actions.setCaptcha(null))
    } else {
        if(data.resultCode === ResultCodeForCaptcha.Captcha) {
            dispatch(requestCaptcha())
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'some error';
            dispatch(stopSubmit('login', { _error: message }))
        }
    }
}

export const logout = (): ThunkTypeAuth => async (dispatch) => {
    debugger
    let data = await authApi.logout()
    if (data.resultCode === ResultCodeEnum.Succes) {
        dispatch(actions.setUserAuth(null, null, null, false));
    }
}

export const requestCaptcha = (): ThunkTypeAuth => async (dispatch) => {
    let data = await authApi.captcha();
    dispatch(actions.setCaptcha(data.url))
}

export default authReducer;