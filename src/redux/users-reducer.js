import { followApi, usersApi } from "../api/api";
import { updateObjectInArraay } from "../utils/object-helpers";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET-CURRENT-PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FECHING = 'TOGGLE-IS-FECHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE-FOLLOWING-IN-PROGRESS';


let initialState = {
    users: [],
    totalUsersCount: 20,
    pageSize: 4,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
    portionSize: null
};


let usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArraay(state.users, 'id', action.userId, {followed: true})
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


export const followAccept = (userId) => ({type: FOLLOW, userId});

export const unfollowAccept = (userId) => ({type: UNFOLLOW, userId});

export const setUsers = (users) => ({type: SET_USERS, users});

export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});

export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount: totalUsersCount});

export const toggleIsFeching = (toggleIsFaching) => ({type: TOGGLE_IS_FECHING, isFetching: toggleIsFaching})

export const toggleFollowingInProgress = (isFetching, id) => ({type: TOGGLE_FOLLOWING_IN_PROGRESS, isFetching, id});




export const requestUsers = (pageSize, currentPage) => async (dispatch) => {
    dispatch(toggleIsFeching(true));
    dispatch(setCurrentPage(currentPage));
    let data = await usersApi.getUsers(pageSize, currentPage)
    dispatch(toggleIsFeching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
};


const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCriator) => {
    dispatch(toggleFollowingInProgress(true, userId));
    await apiMethod(userId)
    dispatch(toggleFollowingInProgress(false, userId))
    dispatch(actionCriator(userId));
}

export const follow = (userId) => {
    return (dispatch) => {
        followUnfollowFlow(dispatch, userId, followApi.followPost, followAccept);
    }
};

export const unfollow = (userId) => {
    return (dispatch) => {
        followUnfollowFlow(dispatch, userId, followApi.followDelete, unfollowAccept);
    }
};






export default usersReducer;