import { createSelector } from "@reduxjs/toolkit";


const getMusicPopSelector = (state) => {
    return state.musicPage.musicPop;
};

export const  getMusicPop = createSelector(getMusicPopSelector, (musicPop) => {
    return musicPop.filter(m => true)
})

export const getToggleIsFaching = (state) => {
    return state.musicPage.isFeching;
};