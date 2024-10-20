import { stopSubmit } from "redux-form";
import { authApi } from "../api/api";

const SET_USER_AUTH = 'SET-USER-AUTH';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
};


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_AUTH:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state;
    };
};


const setUserAuth = (userId, email, login, boollian) => ({type: SET_USER_AUTH, payload: {userId, email, login, isAuth : boollian}});




export const authMe = () => async (dispatch) => {
    let data = await authApi.authMe()
    if (data.resultCode === 0) {
        let { id, email, login } = data.data;
        dispatch(setUserAuth(id, email, login, true));
    }
}

export const login = (email, password, rememberMe) => async (dispatch) => {
    let data = await authApi.login(email, password, rememberMe);
    if (data.resultCode === 0) {
        dispatch(authMe());
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'some error';
        dispatch(stopSubmit('login', { _error: message }))
    }
}

export const logout = () => async dispatch => {
    let data = await authApi.logout()
    if (data.resultCode === 0) {
        dispatch(setUserAuth(null, null, null, false));
    }
}

export default authReducer;