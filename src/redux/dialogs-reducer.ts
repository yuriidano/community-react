import { dialogsAPI } from "../api/dialogs-api";
import { InferActionsTypes, ThunkType } from "./redux-store";

type DialogType = {
    id: number,
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number,
    photos: {small: string, large: string}
}

type MessageType = {
    addedAt: string,
    body: string,
    id: string,
    recipientId: number,
    senderId: number,
    senderName: string,
    translatedBody: null | string,
    viewed: boolean
}

let initialState = {
    dialods: [] as DialogType[],
    messages: [] as MessageType[],
    currentDialogId: null as null | number
};

type initialStateType = typeof initialState;

const dialogsReducer = (state = initialState, action: ActionsTypes):initialStateType => {
    switch (action.type) {
        case "dialogs/ALL-RECIVED":
            return {
                ...state,
                dialods: [...action.payload.dialogs]
            }
        case "dialogs/MESSAGES-RECIVED":
            return {
                ...state,
                messages: action.payload.messages
            }
        case "dialogs/DELETE-MESSAGE":
            return {
                ...state,
                messages: [...state.messages.filter(message => message.id !== action.payload.messageId)]
            }
        case "dialogs/CURRENT-DIALOG-RECIVED":
            return {
                ...state,
                currentDialogId: action.payload.id
            }
        case "dialogs/SEND-MESSAGE":
            return {
                ...state,
                messages: [...state.messages, action.payload.message]
            }
        default:
            return state; 
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;

export const actions = {
    allDialogsRecived: (dialogs: DialogType[]) => ({type: 'dialogs/ALL-RECIVED', payload: {dialogs}} as const),
    messagesRecived: (messages: MessageType[]) => ({type: 'dialogs/MESSAGES-RECIVED', payload: {messages}} as const),
    deleteMessage: (messageId: string) => ({type: 'dialogs/DELETE-MESSAGE', payload: {messageId}} as const),
    currentDialogIdRecived: (id: number) => ({type: 'dialogs/CURRENT-DIALOG-RECIVED', payload: {id}} as const),
    sendMessage: (message: MessageType) => ({type: 'dialogs/SEND-MESSAGE', payload: {message}} as const)
}



type ThunkTypeDialogs = ThunkType<ActionsTypes>;

export const requestDialogs = ():ThunkTypeDialogs => async (dispatch) => {
    try{
        let data = await dialogsAPI.getAllDialogs();
        dispatch(actions.allDialogsRecived(data))
    }catch(error) {
    }
};


export const requestMessages = (userId: number):ThunkTypeDialogs => async (dispatch) => {
    try{
        let data = await dialogsAPI.getListMessagesWithFriend(userId);
        let {items} = data;
        dispatch(actions.messagesRecived(items))
        dispatch(actions.currentDialogIdRecived(userId))
    }catch(error) {
    }
};

export const deleteMessage = (messageId: string):ThunkTypeDialogs => async (dispatch) => {
    try{
        let data = await dialogsAPI.deleteMessage(messageId);
        dispatch(actions.deleteMessage(messageId))
    }catch(error) {
    }
};

export const sendMessage = (userId: number, body: string,):ThunkTypeDialogs => async (dispatch) => {
    try{
        let data = await dialogsAPI.postMessageFriend(userId, body);

        dispatch(actions.sendMessage(data.data.message))
    }catch(error) {
    }
};





export default dialogsReducer;