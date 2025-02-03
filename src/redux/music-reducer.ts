import exp from "constants"
import { musicAPI } from "../api/music-api"
import { InferActionsTypes, ThunkType } from "./redux-store"

export type PhotosType = {
    small: null | string,
    large: null | string
}

type MusicType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: string,
    followed: boolean
}


type nulblType<T> = null | T;

const initialState = {
    musicPop: [] as Array<MusicType>,
    pageSize: 5,
    currentPage: 1,
    filter: {
        term: '',
        friend: null as nulblType<boolean>
    },
    isFaching: false 
}

type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

const musicReducer = (state = initialState, action: ActionsType):InitialStateType => { 
    switch(action.type) {
        case "music/SET-MUSIC-POP":
            return {
                ...state,
                musicPop: [...action.payload.musicPop]
            }
        case "music/TOGGLE-IS-FACHING":
            return {
                ...state,
                ...action.payload
            }
        case "music/SET-FILTER":
            return {
                ...state,
                ...action.payload
            }
        default:
            return state
    }
    
};


type ActionsType = InferActionsTypes<typeof actions>

const actions = {
    setMusicPop: (musicPop: Array<MusicType>) => ({type: 'music/SET-MUSIC-POP', payload: {musicPop}} as const),
    toggleIsFaching: (isFaching: boolean) => ({type: 'music/TOGGLE-IS-FACHING', payload: {isFaching}} as const),
    setFilter: (filter: FilterType) => ({type: 'music/SET-FILTER', payload: {filter}} as const)
};



type ThunkTypeMusic = ThunkType<ActionsType>;


export const requestMusic = (pageSize: number, currentPage: number, filter: FilterType):ThunkTypeMusic => async (dispatch) => {
    try {
        dispatch(actions.setFilter(filter))
        dispatch(actions.toggleIsFaching(true));
        const data = await musicAPI.getMusicPop(pageSize, currentPage, filter.term, filter.friend);
        let { items, totalCount } = data;
        dispatch(actions.setMusicPop(items));
        dispatch(actions.toggleIsFaching(false));
    } catch(error) {
    }
};



export default musicReducer;