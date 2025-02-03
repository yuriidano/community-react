import { createSelector } from "@reduxjs/toolkit";
import { AppStateType } from "./redux-store";


const getMusicPopSelector = (state: AppStateType) => {
    return state.musicPage.musicPop;
};

export const getMusicPop = createSelector(getMusicPopSelector, (musicPop) => {
    return musicPop.filter(music => true)
})

export const getPageSize = (state: AppStateType) => {
    return state.musicPage.pageSize;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.musicPage.currentPage;
}
export const getFilter = (state: AppStateType) => {
    return state.musicPage.filter;
}
export const getIsFaching = (state: AppStateType) => {
    return state.musicPage.isFaching;
}