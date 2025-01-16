import { updateObjectInArraay } from "../utils/object-helpers";
import { UserType } from "../types/types";
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";
import { Dispatch } from "redux";
import { usersApi } from "../api/users-api";


let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 20,
    pageSize: 5,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [] as Array<number>,
    portionSize: null
};


type InitialStateType = typeof initialState;

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
        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;


const actions = {
    followAccept: (userId: number) => ({type: 'users/FOLLOW', userId} as const ),
    unfollowAccept: (userId: number) => ({type: 'users/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'users/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'users/SET_CURRENT_PAGE', currentPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'users/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleIsFeching: (toggleIsFaching: boolean) => ({type: 'users/TOGGLE_IS_FECHING', isFetching: toggleIsFaching} as const),
   toggleFollowingInProgress: (isFetching: boolean, id: number) => ({type: 'users/TOGGLE_FOLLOWING_IN_PROGRESS', isFetching, id} as const)
}





type ExtraThunkArgType = {};
type ThunkType = ThunkAction<Promise<void>, AppStateType, ExtraThunkArgType, ActionsTypes>;

export const requestUsers = (pageSize: number, currentPage: number):ThunkType => async (dispatch) => {
    dispatch(actions.toggleIsFeching(true));
    dispatch(actions.setCurrentPage(currentPage));
    let data = await usersApi.getUsers(pageSize, currentPage)
    dispatch(actions.toggleIsFeching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
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