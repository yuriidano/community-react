import { authMe } from './auth-reducer';


const INITIALIZE_SUCCES = 'app/INITIALIZE-SUCCES';



const initialState = {
    initialize: false 
}

type initialStateType = typeof initialState;



const appReducer = (state = initialState, action: any): initialStateType => {
    switch(action.type) {
        case INITIALIZE_SUCCES:
            return {
                ...state,
                initialize: true
            }
        default:
            return state;
    }
}


type InitialiseSuccesType = {type: typeof INITIALIZE_SUCCES }

export const initialiseSucces = (): InitialiseSuccesType => ({type: INITIALIZE_SUCCES});


export const appInitialize = () => (dispatch: any) => {
    let promise = dispatch(authMe());
    
    Promise.all([promise])
        .then(() => {
            dispatch(initialiseSucces())
        })
};




export default appReducer;