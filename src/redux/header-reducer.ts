import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "./redux-store";


const initialState = {
    activeMenu: true
}

type InitialStateType = typeof initialState;

const headerReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'heade/TOGGLE_ACTIVE_MENU':
            return {
                ...state,
                activeMenu: !state.activeMenu
            }
        default:
            return state
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

const actions = {
    setActiveMenu: () => ({type: 'heade/TOGGLE_ACTIVE_MENU'} as const)
}




type ExtraThunkArgType = {};
type ThunkType = ThunkAction<void, AppStateType, ExtraThunkArgType, ActionsTypes>

export const toggleActiveMenu = ():ThunkType => (dispatch) => {
    dispatch(actions.setActiveMenu());
};






export default headerReducer;