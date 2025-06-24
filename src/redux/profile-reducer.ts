import { stopSubmit } from "redux-form";
import { ResultCodeEnum } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { InferActionsTypes, ThunkType } from "./redux-store";
import { profileApi } from "../api/profile-api";
import { postsAPI } from "../api/posts-api";


let initialState = {
    posts: [] as Array<PostType>,
    status: '',
    profile: null as ProfileType | null,
    isUpdateProgress: false,
    profileMoutn: false
};


type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'profile/ADD_POST':
            return {
                ...state,
                posts: [...state.posts, action.payload.data],
            };
        case 'profile/GET_POSTS':
            return {
                ...state,
                posts: [...action.payload.data]
            }
        case 'profile/DELETE_POSTS': 
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.payload.data.id)
            }
        case 'profile/UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map(post => {
                    if (post.id === action.payload.data.id) {
                        return { ...post, message: action.payload.data.message}
                    }
                    return post;
                })
            }

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
    addPost: (data: PostType) => ({ type: 'profile/ADD_POST', payload: { data } } as const),
    getPosts: (data: PostType[]) => ({ type: 'profile/GET_POSTS', payload: { data } } as const),
    deletePost: (data: PostType) => ({ type: 'profile/DELETE_POSTS', payload: { data } } as const),
    updatePost: (data: PostType) => ({ type: 'profile/UPDATE_POST', payload: { data } } as const),
    setUserStatus: (status: string) => ({ type: 'profile/SET_USER_STATUS', data: { status } } as const),
    deleteMessage: (userId: number) => ({ type: 'profile/DELETE_MESSAGE', userId } as const),
    setProfile: (newProfile: ProfileType) => ({ type: 'profile/SET_PROFILE', newProfile } as const),
    setPhoto: (newPhotos: PhotosType) => ({ type: 'profile/SET_PHOTO', newPhotos } as const),
    toggleIsUpdateProgress: () => ({ type: 'profile/TOGGLE_IS_UPDATE_PROGRESS' } as const),
    toggleProfilemount: (profileMoutn: boolean) => ({ type: 'profile/TOGGLE_PROFILE_MOUNT', payload: { profileMoutn } } as const)
}


type ThunkTypeProfile = ThunkType<ActionsTypes>;

export const requestUserStatus = (userId: number):ThunkTypeProfile => async (dispatch) => {
    try {
        let data = await profileApi.getUserStatus(userId);
        dispatch(actions.setUserStatus(data))
    } catch (error) {
    }
}

export const updateUserStatus = (status: string):ThunkTypeProfile => async (dispatch) => {
    let data = await profileApi.updateUserStatus(status)    
    if (data.resultCode === ResultCodeEnum.Succes) {
        dispatch(actions.setUserStatus(status))
    }
}

export const requestProfile = (userId: number):ThunkTypeProfile => async (dispatch) => {
    let data = await profileApi.getProfile(userId);
    dispatch(actions.setProfile(data));
}

export let requestPhoto = (filePhoto: File):ThunkTypeProfile => async (dispatch) => {
     let data = await profileApi.updagePhoto(filePhoto);
     dispatch(actions.setPhoto(data.photos))
}

export const SumeError = ():ThunkTypeProfile => (dispatch) => {
    dispatch(stopSubmit('music', {_error: 'some error'}))
}

export const updateProfile = (profileData: ProfileType):ThunkTypeProfile => async (dispatch, getState) => {
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
        dispatch(stopSubmit('profile', {'contacts': {[messageForm]: message}}))
    }
}

export const profileMount = (profileMoutn: boolean):ThunkTypeProfile => (dispatch) => {
    dispatch(actions.toggleProfilemount(profileMoutn));
};

export const fetchPosts = ():ThunkTypeProfile => async (dispatch) => {
    const res = await postsAPI.getPosts();
    dispatch(actions.getPosts(res))
}      

export const addPost = (data: string):ThunkTypeProfile => async (dispatch) => {
    try {
        const newPost = { message: data }
        const res = await postsAPI.addPost(newPost);
        dispatch(actions.addPost(res))
    } catch (error) {
        alert(error);
    }
}     

export const deletePost = (id: number):ThunkTypeProfile => async (dispatch) => {
    try {
        const res = await postsAPI.deletePost(id);
        dispatch(actions.deletePost(res))
    } catch (error) {
        alert(error);
    }
}   

export const updatePost = (post: PostType):ThunkTypeProfile => async (dispatch) => {
    try {
        const res = await postsAPI.updatepost(post);
        dispatch(actions.updatePost(res))
    } catch (error) {
        alert(error);
    }
}   

 



export default profileReducer;



