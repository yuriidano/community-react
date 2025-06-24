import { updateObjectInArraay } from "../utils/object-helpers";
import { UserType } from "../types/types";
import { InferActionsTypes, ThunkType } from "./redux-store";
import { Dispatch } from "redux";
import { followedUsersAPI } from "../api/followedUsers-api"


type NulbleType<T> = null | T;

let initialState = {
    followedUsers: [] as Array<UserType>,
    totalUsersCount: 20,
    pageSize: 30,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    portionSize: null,
    term: '',
    friend: null as null | boolean
};


type InitialStateType = typeof initialState;


let folowedUsersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'users/FOLLOW':
            return {
                ...state,
                followedUsers: updateObjectInArraay(state.followedUsers, 'id', action.userId, {followed: true}),
            }
        case 'users/UNFOLLOW':
            return {
                ...state,
                followedUsers: updateObjectInArraay(state.followedUsers, 'id', action.userId, {followed: false})
            }
        case 'users/SET_USERS':
            return {
                ...state,
                followedUsers: action.users,
            }
        case 'users/SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case 'users/SET_TOTAL_USERS_COUNT':
            return {
                ...state, 
                totalUsersCount: action.totalUsersCount
            }
        case 'users/TOGGLE_IS_FECHING':
            return {
                ...state, 
                isFetching: action.isFetching
            }
        case 'users/TOGGLE_FOLLOWING_IN_PROGRESS':
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.id] : [...state.followingInProgress.filter(id => id != action.id)]
            }
        case 'users/SET-TERM':
            return {
                ...state,
                term: action.payload.term
            }
        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;


export const actions = {
    followAccept: (userId: number) => ({type: 'users/FOLLOW', userId} as const ),
    unfollowAccept: (userId: number) => ({type: 'users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'users/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFeching: (toggleIsFaching: boolean) => ({type: 'users/TOGGLE_IS_FECHING', isFetching: toggleIsFaching} as const),
    toggleFollowingInProgress: (isFetching: boolean, id: number) => ({type: 'users/TOGGLE_FOLLOWING_IN_PROGRESS', isFetching, id} as const),
    setTerm: (term: string) => ({type: 'users/SET-TERM', payload: {term}} as const)
}





type ThunkTypeUsers = ThunkType<ActionsTypes>;

export const requestFollowedUsers = (pageSize: number, currentPage: number, term: string, friend: boolean):ThunkTypeUsers => async (dispatch) => {
    dispatch(actions.setTerm(term))
    dispatch(actions.toggleIsFeching(true));
    dispatch(actions.setCurrentPage(currentPage));
    let data = await followedUsersAPI.getUsers(pageSize, currentPage, term, friend)
    dispatch(actions.toggleIsFeching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
};


type DispatchType = Dispatch<ActionsTypes>;

export const requestFollowedFilter = (term: string) => (dispatch: DispatchType) => {
    dispatch(actions.setTerm(term))
};


const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCriator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    await apiMethod(userId)
    dispatch(actions.toggleFollowingInProgress(false, userId))
    dispatch(actionCriator(userId));
}


export const follow = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        followUnfollowFlow(dispatch, userId, followedUsersAPI.follow, actions.followAccept);
    }
};

export const unfollow = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        followUnfollowFlow(dispatch, userId, followedUsersAPI.unfollow, actions.unfollowAccept);
    }
};






export default folowedUsersReducer;