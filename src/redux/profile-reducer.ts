import { stopSubmit } from "redux-form";
import { profileApi } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";

const ADD_POST = 'profile/ADD-POST';
const SET_USER_STATUS = 'profile/SET-USER-STATUS';
const DELETE_MESSAGE = 'profile/DELETE-MESSAGE';
const SET_PROFILE = 'profile/SET-PROFILE';
const SET_PHOTO = 'profile/SET-PHOTO';
const TOGGLE_IS_UPDATE_PROGRESS = 'profile/TOGGLE-IS-UPDATE-PROGRESS';
const TOGGLE_PROFILE_MOUNT = 'profile/TOGGLE-PROFILE-MOUNT';






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

const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 3,
                message: action.data,
                likeCounter: 0,
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        case DELETE_MESSAGE:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.userId)
            }
        case SET_USER_STATUS:
            return {
                ...state,
                ...action.data,
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: {...action.newProfile}
            }
        case SET_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: {...action.newPhotos} } as ProfileType
            } 
        case TOGGLE_IS_UPDATE_PROGRESS:
            return {
                ...state,
                isUpdateProgress: true
            }
        case TOGGLE_PROFILE_MOUNT:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    };
};


type AddPostCriatorType = {
    type: typeof ADD_POST,
    data: string
}
export const addPostCriator = (data: string): AddPostCriatorType => ({type: ADD_POST, data});


type SetUserStatusType = {
    type: typeof SET_USER_STATUS,
    data: {status: string}
}
const setUserStatus = (status: string): SetUserStatusType => ({type: SET_USER_STATUS, data: {status: status}});


type DeleteMessageType = {
    type: typeof DELETE_MESSAGE,
    userId: number
}
export const deleteMessage = (userId: number): DeleteMessageType => ({type: DELETE_MESSAGE, userId});


type SetProfileType = {
    type: typeof SET_PROFILE,
    newProfile: ProfileType
}
const setProfile = (newProfile: ProfileType) => ({type: SET_PROFILE, newProfile});



type SetPhotoType = {
    type: typeof SET_PHOTO,
    newPhotos: PhotosType
}
const setPhoto = (newPhotos: PhotosType): SetPhotoType => ({type: SET_PHOTO, newPhotos});




type ToggleIsUpdateProgressType = {
    type: typeof TOGGLE_IS_UPDATE_PROGRESS
}
const toggleIsUpdateProgress = (): ToggleIsUpdateProgressType => ({type: TOGGLE_IS_UPDATE_PROGRESS});


type ToggleProfilemountType = {
    type: typeof TOGGLE_PROFILE_MOUNT,
    payload: {profileMoutn: boolean}
}
const toggleProfilemount = (profileMoutn: boolean): ToggleProfilemountType => ({type: TOGGLE_PROFILE_MOUNT, payload: {profileMoutn}});












export const requestUserStatus = (userId: number) => async (dispatch: any) => {
    try {
        let data = await profileApi.getUserStatus(userId);
        dispatch(setUserStatus(data))
    } catch (error) {
    }
}

export const updateUserStatus = (status: string) => async (dispatch: any) => {
    let data = await profileApi.updateUserStatus(status)    
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const requestProfile = (userId: number) => async (dispatch: any) => {
    let data = await profileApi.getProfile(userId);
    dispatch(setProfile(data));
}

export let requestPhoto = (filePhoto: any) => async (dispatch: any) => {
     let data = await profileApi.updagePhoto(filePhoto);
     dispatch(setPhoto(data.photos))
}

export const SumeError = () => (dispatch: any) => {
    dispatch(stopSubmit('music', {_error: 'some error'}))
}

export const updateProfile = (profileData: ProfileType) => async (dispatch: any, getState: any) => {
    let userId = getState().auth.userId;
    let data = await profileApi.updateProfile(profileData);

    if(data.resultCode === 0) {
        dispatch(requestProfile(userId));
        dispatch(toggleIsUpdateProgress())
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

export const profileMount = (profileMoutn: boolean) => (dispatch: any) => {
    dispatch(toggleProfilemount(profileMoutn));
};






export default profileReducer;



