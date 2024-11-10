import { infoApi } from "../api/api";


const SET_PROFILE_INFO = 'info/SET-PROFILE-INFO';


let initialState = {
    profileInfo: null,

};


const infoReducer = (state = initialState, action) => {
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


const setProfileInfo = (newProfile) => ({type: SET_PROFILE_INFO, newProfile});



export const requestProfileInfo = (userId) => async (dispatch) => {
    try {
        let data = await infoApi.getProfileInfo(userId);
        
        dispatch(setProfileInfo(data))
    } catch(error) {

    }
}




export default infoReducer;