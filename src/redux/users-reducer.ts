import { updateObjectInArraay } from "../utils/object-helpers";
import { UserType } from "../types/types";
import { InferActionsTypes, ThunkType } from "./redux-store";
import { Dispatch } from "redux";
import { usersApi } from "../api/users-api";

type NulbleType<T> = null | T;

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 20,
    pageSize: 4,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    portionSize: null,
    filter: {
        term: '',
        friend: null as NulbleType<boolean>
    }
};


type InitialStateType = typeof initialState;
export type FilterInitialType = typeof initialState.filter;

let usersReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'users/FOLLOW':
            return {
                ...state,
                users: updateObjectInArraay(state.users, 'id', action.userId, {followed: true}),
            }
        case 'users/UNFOLLOW':
            return {
                ...state,
                users: updateObjectInArraay(state.users, 'id', action.userId, {followed: false})
            }
        case 'users/SET_USERS':
            return {
                ...state,
                users: action.users,
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
        case 'users/SET-FILTER':
            return {
                ...state,
                filter: action.payload.filter
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
    setFilter: (filter: FilterInitialType) => ({type: 'users/SET-FILTER', payload: {filter}} as const)
}





type ThunkTypeUsers = ThunkType<ActionsTypes>;

export const requestUsers = (pageSize: number, currentPage: number, filter: FilterInitialType):ThunkTypeUsers => async (dispatch) => {
    dispatch(actions.setFilter(filter))
    dispatch(actions.toggleIsFeching(true));
    dispatch(actions.setCurrentPage(currentPage));
    let data = await usersApi.getUsers(pageSize, currentPage, filter.term, filter.friend)
    dispatch(actions.toggleIsFeching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
};


type DispatchType = Dispatch<ActionsTypes>;

export const requestFilter = (filter: FilterInitialType) => (dispatch: DispatchType) => {
    dispatch(actions.setFilter(filter))
};


const followUnfollowFlow = async (dispatch: Dispatch<ActionsTypes>, userId: number, apiMethod: any, actionCriator: (userId: number) => ActionsTypes) => {
    dispatch(actions.toggleFollowingInProgress(true, userId));
    await apiMethod(userId)
    dispatch(actions.toggleFollowingInProgress(false, userId))
    dispatch(actionCriator(userId));
}


export const follow = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        followUnfollowFlow(dispatch, userId, usersApi.follow, actions.followAccept);
    }
};

export const unfollow = (userId: number) => {
    return (dispatch: Dispatch<ActionsTypes>) => {
        followUnfollowFlow(dispatch, userId, usersApi.unfollow, actions.unfollowAccept);
    }
};






export default usersReducer;