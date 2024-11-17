import { stopSubmit } from "redux-form";
import { profileApi } from "../api/api";

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
    ],
    status: '',
    profile: null,
    isUpdateProgress: false,
    profileMoutn: false
};


const profileReducer = (state = initialState, action) => {
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
                ...action.data
            }
        case SET_PROFILE:
            return {
                ...state,
                profile: {...action.newProfile}
            }
        case SET_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: {...action.newPhotos}}
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


export const addPostCriator = (data) => ({type: ADD_POST, data});

const setUserStatus = (status) => ({type: SET_USER_STATUS, data: {status: status}});

export const deleteMessage = (userId) => ({type: DELETE_MESSAGE, userId});

const setProfile = (newProfile) => ({type: SET_PROFILE, newProfile});

const setPhoto = (newPhotos) => ({type: SET_PHOTO, newPhotos});

const toggleIsUpdateProgress = () => ({type: TOGGLE_IS_UPDATE_PROGRESS});

const toggleProfilemount = (profileMoutn) => ({type: TOGGLE_PROFILE_MOUNT, payload: {profileMoutn}});




export const requestUserStatus = (userId) => async (dispatch) => {
    try {
        let data = await profileApi.getUserStatus(userId);
        dispatch(setUserStatus(data))
    } catch (error) {
    }
}

export const updateUserStatus = (status) => async (dispatch) => {
    let data = await profileApi.updateUserStatus(status)    
    if (data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const requestProfile = (userId) => async (dispatch) => {
    let data = await profileApi.getProfile(userId);
    dispatch(setProfile(data));
}

export let requestPhoto = (filePhoto) => async (dispatch) => {
     let data = await profileApi.updagePhoto(filePhoto);
     dispatch(setPhoto(data.photos))
}

export const SumeError = () => (dispatch) => {
    dispatch(stopSubmit('music', {_error: 'some error'}))
}

export const updateProfile = (profileData) => async (dispatch, getState) => {
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

export const profileMount = (profileMoutn) => (dispatch) => {
    dispatch(toggleProfilemount(profileMoutn));
};






export default profileReducer;