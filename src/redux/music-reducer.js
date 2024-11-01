import { musicApi } from "../api/api";

const SET_MUSIC = 'music/SET_MUSIC';
const TOGGLE_IS_FACHING = 'music/TOGGLE-IS-FACHING';


const initialState = {
    musicPop: [],
    isFeching: false
}


const musicReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_MUSIC:
            return {
                ...state,
                musicPop: [...action.newMSusicPop]
            }
        case TOGGLE_IS_FACHING:
            return {
                ...state,
               ...action.payload
            }
        default:
            return state;
    }
};


const setMusic = (newMSusicPop) => ({type: SET_MUSIC, newMSusicPop});
const toggleIsFaching = (isFeching) => ({type: TOGGLE_IS_FACHING, payload: {isFeching}});


export const requestMusic = () => async (dispatch) => {
    dispatch(toggleIsFaching(true));
    let data = await musicApi.getMusic();
    let {items} = data;
    dispatch(setMusic(items));
    dispatch(toggleIsFaching(false));
};







export default musicReducer;