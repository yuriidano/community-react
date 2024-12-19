const TOGGLE_ACTIVE_MENU = 'header/TOGGLE-ACTIVE-MENU';

const initialState = {
    activeMenu: true
}

type InitialStateType = typeof initialState;

const headerReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case TOGGLE_ACTIVE_MENU:
            return {
                ...state,
                activeMenu: !state.activeMenu
            }
        default:
            return state
    }
};



type SetActiveMenuType = {type: typeof TOGGLE_ACTIVE_MENU};
const setActiveMenu = (): SetActiveMenuType => ({type: TOGGLE_ACTIVE_MENU});


export const toggleActiveMenu = () => (dispatch: any) => {
    dispatch(setActiveMenu());
};






export default headerReducer;