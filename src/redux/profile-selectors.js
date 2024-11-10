

export const getStatus = (state) => {
    return state.profilePage.status;
}

export const getAutoRizedUserId = (state) => {
    return state.auth.userId;
}

export const getIsAuth = (state) => {
    return state.auth.isAuth;
}

export const getPosts = (state) => {
    return state.profilePage.posts;
}
export const getProfile = (state) => {
    return state.profilePage.profile;
}
export const getIsUpdateProgress = (state) => {
    return state.profilePage.isUpdateProgress;
}

export const getProfileMy = (state) => {
    return state.infoPage.profileInfo;
}

