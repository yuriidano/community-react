import { infoApi } from "../api/api";


const SET_PROFILE_INFO = 'info/SET-PROFILE-INFO';


let initialState = {
    profileInfo: null,
};

type InitialStateType = typeof initialState;

const infoReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_PROFILE_INFO:
            return {
                ...state,
                profileInfo: {...action.newProfile}
            }
        default:
            return state;
    };
};



type SetProfileInfoContactsType = {
    github: string,
    vk: string,
    facebook: string,
    instagram: string,
    twitter: string,
    website: string ,
    youtube: string,
    mainLink: string
}

type SetProfileInfoPhotosType = {
    small: string,
    large: string
}

type sSetProfileInfoNewProfileType = {
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: SetProfileInfoContactsType,
    photos: SetProfileInfoPhotosType
}
type setProfileInfoType = {
    type: typeof SET_PROFILE_INFO,
    newProfile: sSetProfileInfoNewProfileType
}
const setProfileInfo = (newProfile: sSetProfileInfoNewProfileType): setProfileInfoType => ({type: SET_PROFILE_INFO, newProfile});


export const requestProfileInfo = (userId: number) => async (dispatch: any) => {
    try {
        let data = await infoApi.getProfileInfo(userId);
        
        dispatch(setProfileInfo(data))
    } catch(error) {

    }
}




export default infoReducer;