import { createSelector } from "@reduxjs/toolkit";

const getUsersSelector = (state) => {
    return state.usersPage.users;
};

export const getUsers = createSelector(getUsersSelector, (users) => {
    return users.filter(u => true);
})

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}

export const getUsersOld = (state) => {
    return state.usersPage.users.filter(u => true)
};

export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
};

export const getcurrentPage = (state) => {
    return state.usersPage.currentPage;
}

export const getIsFetching = (state) => {
   return state.usersPage.isFetching;
}

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress
}
export const getPortionSize = (state) => {
   return state.usersPage.portionSize;
}

