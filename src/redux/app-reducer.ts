import { ThunkAction } from 'redux-thunk';
import { authMe } from './auth-reducer';
import { AppStateType, InferActionsTypes } from './redux-store';




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

const actions = {
    initialiseSucces: () => ({type: 'app/INITIALIZE_SUCCES'} as const)
}


type ExtraThunkArgType = {};
type ThunkType = ThunkAction<void, AppStateType, ExtraThunkArgType, ActionsTypes>

export const appInitialize = (): ThunkType => (dispatch) => {
    let promise = dispatch(authMe());
    
    Promise.all([promise])
        .then(() => {
            dispatch(actions.initialiseSucces())
        })
};




export default appReducer;