import { followApi, usersApi } from "../api/api";
import { updateObjectInArraay } from "../utils/object-helpers";
import { UserType } from "../types/types";

const FOLLOW = 'users/FOLLOW';
const UNFOLLOW = 'users/UNFOLLOW';
const SET_USERS = 'users/SET-USERS';
const SET_CURRENT_PAGE = 'users/SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'users/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FECHING = 'users/TOGGLE-IS-FECHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'users/TOGGLE-FOLLOWING-IN-PROGRESS';



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

let usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArraay(state.users, 'id', action.userId, {followed: true}),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArraay(state.users, 'id', action.userId, {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users,
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage,
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state, 
                totalUsersCount: action.totalUsersCount
            }
        case TOGGLE_IS_FECHING:
            return {
                ...state, 
                isFetching: action.isFetching
            }
        case TOGGLE_FOLLOWING_IN_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.id] : [...state.followingInProgress.filter(id => id != action.id)]
            }
        default:
            return state;
    }
};


type FllowAcceptType = {
    type: typeof FOLLOW,
    userId: number
}
export const followAccept = (userId: number): FllowAcceptType => ({type: FOLLOW, userId});


type UnfollowAcceptType = {
    type: typeof UNFOLLOW,
    userId: number
}
export const unfollowAccept = (userId: number): UnfollowAcceptType => ({type: UNFOLLOW, userId});



type SetUsersType = {
    type: typeof SET_USERS  
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users});



type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});



type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT,
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number):SetTotalUsersCountType => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});



type ToggleIsFechingType = {
    type: typeof TOGGLE_IS_FECHING,
    isFetching: boolean
}
export const toggleIsFeching = (toggleIsFaching: boolean): ToggleIsFechingType => ({type: TOGGLE_IS_FECHING, isFetching: toggleIsFaching});


type ToggleFollowingInProgressType = {
    type: typeof TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching: boolean,
    id: number
}
const toggleFollowingInProgress = (isFetching: boolean, id: number): ToggleFollowingInProgressType => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, id});




export const requestUsers = (pageSize: number, currentPage: number) => async (dispatch: any) => {
    dispatch(toggleIsFeching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersApi.getUsers(pageSize, currentPage)
    dispatch(toggleIsFeching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
};


const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCriator: any) => {
    dispatch(toggleFollowingInProgress(true, userId));
    await apiMethod(userId)
    dispatch(toggleFollowingInProgress(false, userId))
    dispatch(actionCriator(userId));
}

export const follow = (userId: number) => {
    return (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, followApi.followPost, followAccept);
    }
};

export const unfollow = (userId: number) => {
    return (dispatch: any) => {
        followUnfollowFlow(dispatch, userId, followApi.followDelete, unfollowAccept);
    }
};






export default usersReducer;