import { stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";
import { profileApi } from "../api/profile-api";


let initialState = {
    posts: [
        { id: 1, message: 'Hello world', likeCounter: 10 },
        { id: 2, message: 'My name is Yura', likeCounter: 2 },
    ] as Array<PostType>,
    status: '',
    profile: null as ProfileType | null,
    isUpdateProgress: false,
    profileMoutn: false
};


type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'profile/ADD_POST':
            let newPost = {
                id: 3,
                message: action.data,
                likeCounter: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case 'profile/DELETE_MESSAGE':
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.userId)
            }
        case 'profile/SET_USER_STATUS':
            return {
                ...state,
                ...action.data,
            }
        case 'profile/SET_PROFILE':
            return {
                ...state,
                profile: {...action.newProfile}
            }
        case 'profile/SET_PHOTO':
            return {
                ...state,
                profile: {...state.profile, photos: {...action.newPhotos} } as ProfileType
            } 
        case 'profile/TOGGLE_IS_UPDATE_PROGRESS':
            return {
                ...state,
                isUpdateProgress: true
            }
        case 'profile/TOGGLE_PROFILE_MOUNT':
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    };
};

type ActionsTypes = InferActionsTypes<typeof actions>;


export const actions = {
    addPost: (data: string) => ({ type: 'profile/ADD_POST', data } as const),
    setUserStatus: (status: string) => ({ type: 'profile/SET_USER_STATUS', data: { status: status } } as const),
    deleteMessage: (userId: number) => ({ type: 'profile/DELETE_MESSAGE', userId } as const),
    setProfile: (newProfile: ProfileType) => ({ type: 'profile/SET_PROFILE', newProfile } as const),
    setPhoto: (newPhotos: PhotosType) => ({ type: 'profile/SET_PHOTO', newPhotos } as const),
    toggleIsUpdateProgress: () => ({ type: 'profile/TOGGLE_IS_UPDATE_PROGRESS' } as const),
    toggleProfilemount: (profileMoutn: boolean) => ({ type: 'profile/TOGGLE_PROFILE_MOUNT', payload: { profileMoutn } } as const)
}



type ExtraThunkArgType = {};
type ThunkType = ThunkAction<Promise<void>, AppStateType, ExtraThunkArgType, ActionsTypes>


export const requestUserStatus = (userId: number):ThunkType => async (dispatch) => {
    try {
        let data = await profileApi.getUserStatus(userId);
        dispatch(actions.setUserStatus(data))
    } catch (error) {
    }
}

export const updateUserStatus = (status: string):ThunkType => async (dispatch) => {
    let data = await profileApi.updateUserStatus(status)    
    if (data.resultCode === ResultCodeEnum.Succes) {
        dispatch(actions.setUserStatus(status))
    }
}

export const requestProfile = (userId: number):ThunkType => async (dispatch) => {
    let data = await profileApi.getProfile(userId);
    dispatch(actions.setProfile(data));
}

export let requestPhoto = (filePhoto: File):ThunkType => async (dispatch) => {
     let data = await profileApi.updagePhoto(filePhoto);
     dispatch(actions.setPhoto(data.photos))
}

export const SumeError = () => (dispatch: Dispatch<ActionsTypes>) => {
    dispatch(stopSubmit('music', {_error: 'some error'}))
}

export const updateProfile = (profileData: ProfileType): ThunkType => async (dispatch, getState) => {
    let userId = getState().auth.userId;
    let data = await profileApi.updateProfile(profileData);

    if(data.resultCode === 0) {
        dispatch(requestProfile(Number(userId)));
        dispatch(actions.toggleIsUpdateProgress())
    } else {
        let message = data.messages.length > 0 ? data.messages[0] : 'some error';


        let messageArray = message.split('');

        let messageForm = messageArray.slice(
            messageArray.indexOf('>') + 1,
            messageArray.indexOf(')')
        ).join('').toLowerCase();
     
        console.log(messageForm);

        dispatch(stopSubmit('profile', {'contacts': {[messageForm]: message}}))
    }
}

export const profileMount = (profileMoutn: boolean) => (dispatch: Dispatch<ActionsTypes>, getState: () => AppStateType) => {
    dispatch(actions.toggleProfilemount(profileMoutn));
};

export const addPost = (data: string) => (dispatch:Dispatch<ActionsTypes>, getState: () => AppStateType) => {
    dispatch(actions.addPost(data))
}       



export default profileReducer;



