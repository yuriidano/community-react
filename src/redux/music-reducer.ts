import { ThunkAction } from "redux-thunk"
import { AppStateType, InferActionsTypes } from "./redux-store"
import { MusicAPI } from "../api/api"

export type PhotosType = {
    small: null | string,
    large: null | string
}

export type MusicType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: string,
    followed: boolean
}


const initialState = {
    musicPop: [] as Array<MusicType>,
    isFachingMusic: false 
}

type InitialStateType = typeof initialState;

const musicReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
    switch(action.type) {
        case "music/SET-MUSIC-POP":
            return {
                ...state,
                musicPop: action.musicPop
            }
        case "music/TOGGLE-IS-FACHING-MUSIC":
            return {
                ...state,
                isFachingMusic: action.isFachingMusic
            }
        default:
            return state
    }
};



type ActionsTypes = InferActionsTypes<typeof actions>;


const actions = {
    setMusicPop: (musicPop: Array<MusicType>) => ({type: 'music/SET-MUSIC-POP', musicPop} as const),
    toggleIsFachingMusic: (isFachingMusic: boolean) => ({type: 'music/TOGGLE-IS-FACHING-MUSIC', isFachingMusic}as const )
};

type ExtraThunkArgType = {};
type ThunkType = ThunkAction<Promise<void>, AppStateType, ExtraThunkArgType, ActionsTypes>;

export const requestMusicPop = ():ThunkType => async (dispatch, getState) => {
    try{
        dispatch(actions.toggleIsFachingMusic(true))
        let data = await MusicAPI.getMusicPop();
        let { items, totalCount } = data;
        dispatch(actions.setMusicPop(items))
        dispatch(actions.toggleIsFachingMusic(false))
    }catch(error) {
    }
}



export default musicReducer;