import { ResultCodeEnum } from "../api/api";
import { InferActionsTypes, ThunkType } from "./redux-store";
import { authApi, ResultCodeForCaptcha } from "../api/auth-api";



let initialState = {
    userId: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
    captcha: null as null | string,
    globalError: null as null | string,
    globalErrorSingUp: null as null | string,
    registrationAccept: false
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
        case "auth/SET-CLOBAL-ERROR":
            return {
                ...state,
                globalError: action.payload.clobalError
            }
        case "auth/SET-CLOBAL-ERROR-SING-UP":
            return {
                ...state,
                globalErrorSingUp: action.payload.globalErrorSingUp
            }
        case "auth/TOGGLE-REGISTRATION-ACCEPT":
            return {
                ...state,
                registrationAccept: action.payload.registrationAccept
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
    setGlobalError: (clobalError: string | null) => ({type: 'auth/SET-CLOBAL-ERROR', payload: {clobalError}} as const),
    setglobalErrorSingUp: (globalErrorSingUp: string | null) => ({type: 'auth/SET-CLOBAL-ERROR-SING-UP', payload: {globalErrorSingUp}} as const),
    toggleRegistrationAccept: (registrationAccept: boolean) => ({type: 'auth/TOGGLE-REGISTRATION-ACCEPT', payload: {registrationAccept}} as const)
}




type ThunkTypeAuth = ThunkType<ActionsTypes>;


export const authMe = ():ThunkTypeAuth => async (dispatch) => {
    let data = await authApi.authMe()
    if (data.resultCode === ResultCodeEnum.Succes) {
        let { id, email, login } = data.data;
        dispatch(actions.setUserAuth(id, email, login, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string | null):ThunkTypeAuth => async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe, captcha);
    if (data.resultCode === ResultCodeEnum.Succes) {
        dispatch(authMe());
        dispatch(actions.setCaptcha(null))
    } else {
        if(data.resultCode === ResultCodeForCaptcha.Captcha) {
            dispatch(requestCaptcha())
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : 'some error';
           dispatch(actions.setGlobalError(message))
        }
    }
}

export const logout = (): ThunkTypeAuth => async (dispatch) => {
    let data = await authApi.logout()
    if (data.resultCode === ResultCodeEnum.Succes) {
        dispatch(actions.setUserAuth(null, null, null, false));
    }
}

export const requestCaptcha = (): ThunkTypeAuth => async (dispatch) => {
    let data = await authApi.captcha();
    dispatch(actions.setCaptcha(data.url))
}


export const clearGlobalError = ():ThunkTypeAuth => (dispatch) => {
    dispatch(actions.setGlobalError(null))
}


export const registration = (name: string, email: string, password: string):ThunkTypeAuth => async (dispatch) => {
    try{
        let data = await authApi.register(name, email, password, true)
        let { Response } = data;
        if(Response[0].v === true) {
            dispatch(actions.toggleRegistrationAccept(true))
        }
        if(Response.length > 1 && Response[1]?.v?.[0]?.message){
            dispatch(actions.setglobalErrorSingUp(Response[1].v[0].message));
        }
    }catch(error) {
        console.log(error);
    }
}

export default authReducer;