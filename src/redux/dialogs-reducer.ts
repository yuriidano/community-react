import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes, ThunkType } from "./redux-store";


type dialogsItemType = {
    id: number,
    name: string,
    url: string
}
type messageItemType = {
    id: number,
    message: string
}

type InitialStateType = {
    dialods: Array<dialogsItemType>,
    messages: Array<messageItemType>
}


let initialState: InitialStateType = {
    dialods: [
        { id: 1, name: 'Yura', url: 'https://mighty.tools/mockmind-api/content/human/72.jpg' },
        { id: 2, name: 'Ira', url: 'https://mighty.tools/mockmind-api/content/human/78.jpg' },
        { id: 3, name: 'Ola', url: 'https://mighty.tools/mockmind-api/content/human/55.jpg' },
        { id: 4, name: 'Dasha', url: 'https://mighty.tools/mockmind-api/content/human/9.jpg' },
        { id: 5, name: 'Kata', url: 'https://mighty.tools/mockmind-api/content/human/26.jpg' },
        { id: 6, name: 'Valera', url: 'https://mighty.tools/mockmind-api/content/human/37.jpg' },
    ],
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is you' },
        { id: 3, message: 'Yo' },
    ] 
};


const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

    switch (action.type) {
        case 'dialogs/SEND_MESSAGE': 
            let newMessage = {id: 4, message: action.data}
        return {
            ...state,
            messages: [...state.messages, newMessage],
        };
        case 'dialogs/DELETE_MESAGE':
            return {
                ...state,
                messages: state.messages.filter(m => m.id != action.userId)
            }
        default:
            return state; 
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    newMessage: (data: string) => ({ type: 'dialogs/SEND_MESSAGE', data } as const),
    deleteMessage: (userId: number) => ({ type: 'dialogs/DELETE_MESAGE', userId } as const)
}



type ThunkTypeDialogs = ThunkType<ActionsTypes>;

export const sendMessage = (data: string):ThunkTypeDialogs => (dispatch) => {
    dispatch(actions.newMessage(data))
};




export default dialogsReducer;