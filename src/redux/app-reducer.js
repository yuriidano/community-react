import { authMe } from "./auth-reducer";

const INITIALIZE_SUCCES = 'app/INITIALIZE-SUCCES';


const initialState = {
    initialize: false
}

const appReducer = (state = initialState, action) => {
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


export const initialiseSucces = () => ({type: INITIALIZE_SUCCES});


export const appInitialize = () => (dispatch) => {
    let promise = dispatch(authMe());
    
    Promise.all([promise])
        .then(() => {
            dispatch(initialiseSucces())
        })
};




export default appReducer;