const TOGGLE_ACTIVE_MENU = 'header/TOGGLE-ACTIVE-MENU';

const initialState = {
    activeMenu: true
}

const headerReducer = (state = initialState, action) => {
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


const setActiveMenu = () => ({type: TOGGLE_ACTIVE_MENU});


export const toggleActiveMenu = () => (dispatch) => {
    dispatch(setActiveMenu());
};






export default headerReducer;