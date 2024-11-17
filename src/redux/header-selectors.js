
export const getIsAuth = (state) => {
    return state.auth.isAuth;
}

export const getLogin = (state) => {
    return state.auth.login;
}

export const getUserId = (state) => {
    return state.auth.userId;
}

export const getActiveMenu = (state) => {
    return state.header.activeMenu;
}
