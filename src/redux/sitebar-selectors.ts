
import { AppStateType } from "./redux-store";

export const getActiveMenu = (state: AppStateType) => {
    return state.header.activeMenu;
};

