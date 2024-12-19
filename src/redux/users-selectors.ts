
import { createSelector } from "@reduxjs/toolkit";
import { AppStateType } from "./redux-store";

const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})

export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}

export const getUsersOld = (state: AppStateType) => {
    return state.usersPage.users.filter(u => true)
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getcurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state: AppStateType) => {
   return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state: AppStateType) => {
    return state.usersPage.followingInProgress
}
export const getPortionSize = (state: AppStateType) => {
   return state.usersPage.portionSize;
}

