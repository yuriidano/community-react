import { ThunkAction } from 'redux-thunk';
import { authMe } from './auth-reducer';
import { AppStateType, InferActionsTypes, ThunkType } from './redux-store';




const initialState = {
    initialize: false 
}

type initialStateType = typeof initialState;

const appReducer = (state = initialState, action: ActionsTypes): initialStateType => {
    switch(action.type) {
        case 'app/INITIALIZE_SUCCES':
            return {
                ...state,
                initialize: true
            }
        default:
            return state;
    }
}

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    initialiseSucces: () => ({type: 'app/INITIALIZE_SUCCES'} as const)
}





type ThunkTypeApp = ThunkType<ActionsTypes>;

export const appInitialize = ():ThunkTypeApp => (dispatch) => {
    let promise = dispatch(authMe());
    
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initialiseSucces())
        })
};




export default appReducer;