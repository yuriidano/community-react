import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes, ThunkType } from "./redux-store";
import { infoApi } from "../api/info-api";
import { ProfileType } from "../types/types";


let initialState = {
    profileInfo: {} as ProfileType,
};

type InitialStateType = typeof initialState;

const infoReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'info/SET_PROFILE_INFO':
            return {
                ...state,
                profileInfo: {...action.newProfile}
            }
        default:
            return state;
    };
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
    setProfileInfo: (newProfile: ProfileType) => ({type: 'info/SET_PROFILE_INFO', newProfile}as const)
}


type ThunkTypeInfo = ThunkType<ActionsTypes>;

export const requestProfileInfo = (userId: number):ThunkTypeInfo => async (dispatch) => {
    try {
        let data = await infoApi.getProfileInfo(userId);
        dispatch(actions.setProfileInfo(data))
    } catch(error) {

    }
}




export default infoReducer;