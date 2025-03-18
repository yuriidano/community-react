import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes, ThunkType } from "./redux-store";
import { infoApi } from "../api/info-api";
import { ProfileType } from "../types/types";
import { v1 } from "uuid";

type NewsItemType = {
    source: {id: string, name: string},
    description: string,
    url: string,
    id?: string
}


let initialState = {
    profileInfo: {} as ProfileType,
    news: [] as NewsItemType[]
};

type InitialStateType = typeof initialState;

const infoReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'info/SET_PROFILE_INFO':
            return {
                ...state,
                profileInfo: {...action.newProfile}
            }
        case "info/NEWS-RECIVED":
            return {
                ...state,
                news: [...action.payload.news.map(n => ({...n, id: v1()}))]
            }
        default:
            return state;
    };
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
    setProfileInfo: (newProfile: ProfileType) => ({type: 'info/SET_PROFILE_INFO', newProfile} as const),
    newsRecived: (news: NewsItemType[]) => ({type: 'info/NEWS-RECIVED', payload: {news}} as const)
}


type ThunkTypeInfo = ThunkType<ActionsTypes>;

export const requestProfileInfo = (userId: number): ThunkTypeInfo => async (dispatch) => {
    try {
        let data = await infoApi.getProfileInfo(userId);
        dispatch(actions.setProfileInfo(data))
    } catch (error) {
    }
}

export const requestNews = (): ThunkTypeInfo => async (dispatch) => {
    try {
        let data = await infoApi.getNews();
        dispatch(actions.newsRecived(data.articles))
    } catch (error) {
    }
}




export default infoReducer;