const SEND_MESSAGE = 'dialogs/SEND-MESSAGE';
const DELETE_MESAGE = 'dialogs/DELETE-MESAGE';


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


const dialogsReducer = (state = initialState, action: any): InitialStateType => {

    switch (action.type) {
        case SEND_MESSAGE: 
            let newMessage = {id: 4, message: action.data}
        return {
            ...state,
            messages: [...state.messages, newMessage],
        };
        case DELETE_MESAGE:
            return {
                ...state,
                messages: state.messages.filter(m => m.id != action.userId)
            }
        default:
            return state; 
    }
};


type NewMessageType = {type: typeof SEND_MESSAGE, data: string};
export const newMessage = (data: string): NewMessageType => ({type: SEND_MESSAGE, data});

type deleteMessageType = {type: typeof DELETE_MESAGE, userId: number}
export const deleteMessage = (userId: number): deleteMessageType => ({type: DELETE_MESAGE, userId});







export const sendMessage = (data: string) => (dispatch: any) => {
    dispatch(newMessage(data))
};




export default dialogsReducer;