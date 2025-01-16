import { createSelector } from "@reduxjs/toolkit";
import { AppStateType } from "./redux-store";


const getMusicPopSelector = (state: AppStateType) => {
    return state.musicPage.musicPop
};

export const getMusicPop = createSelector(getMusicPopSelector, (musicPop) => {
    return musicPop.filter(music => true)
});

export const getIsFachingMusic = (state: AppStateType) => {
    return state.musicPage.isFachingMusic;
}