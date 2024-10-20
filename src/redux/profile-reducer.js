import { profileApi } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_USER_STATUS = 'SET-USER-STATUS';
const DELETE_MESSAGE = 'DELETE-MESSAGE';



let initialState = {
    posts: [
        { id: 1, message: 'Hello world', likeCounter: 10 },
        { id: 2, message: 'My name is Yura', likeCounter: 2 },
    ],
    profile: null,
    status: ''
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
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case SET_USER_STATUS:
            return {
                ...state,
                ...action.data
            }
        default:
            return state;
    };
};


export const addPostCriator = (data) => ({type: ADD_POST, data});

export const setUserProfile = (profile) => ({type: SET_USER_PROFILE, profile});

const setUserStatus = (status) => ({type: SET_USER_STATUS, data: {status: status}});

export const deleteMessage = (userId) => ({type: DELETE_MESSAGE, userId});





export const getProfileId = (userId) => async (dispatch) => {
    let data = await profileApi.getProfileId(userId)
    dispatch(setUserProfile(data))
}


export const getUserStatus = (userId) => async (dispatch) => {
    let data = await profileApi.getUserStatus(userId)
    dispatch(setUserStatus(data))
}

export const updateUserStatus = (status) => async (dispatch) => {
   let data = await profileApi.updateUserStatus(status)
   if(data.resultCode === 0) {
    dispatch(setUserStatus(status))
}
}


export default profileReducer;