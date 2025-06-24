import { Dispatch } from 'redux';
import { v1 } from "uuid";
import { InferActionsTypes, ThunkType } from "./redux-store";
import { chatAPI } from '../api/chat-api';

type MessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}

type MessageTypeAPI = MessageType & {id?: string}

type StatusType = 'panding' | 'ready';
const initialState = {
    messages: [] as MessageTypeAPI[],
    status: 'panding' as StatusType
}
type InitialStateType = typeof initialState;


const chatReducer = (state = initialState, action: actionsType):InitialStateType => {
    switch(action.type) {
        case "chat/MESSAGES-RECIVED":
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: v1()}))].filter((_, index, array) => index >= array.length - 50)
            }
        case 'chat/STATUS-CHANGED':
            return {
                ...state,
                status: action.payload.status
            }
        case 'chat/RESET-MESSEGES':
            return {
                ...state,
                messages: action.payload.messages
            }
        default:
            return state
    }
}

type actionsType = InferActionsTypes<typeof actions>

const actions = {
    messagesRecived: (messages: MessageType[]) => ({type: 'chat/MESSAGES-RECIVED', payload: {messages}} as const),
    statusChanged: (status: StatusType) => ({type: 'chat/STATUS-CHANGED', payload: {status}} as const),
    resetMesseges: (messages: []) => ({type: 'chat/RESET-MESSEGES', payload: {messages}} as const)
};


let _newMessageHandler: ((messages: MessageType[]) => void) | null = null;
let _newStatusHandler: ((status: StatusType) => void) | null = null;

const newMessageHandlerCriator = (dispatch: Dispatch) => {
    if(_newMessageHandler === null) {
        _newMessageHandler = (messages: MessageType[]) => {
            dispatch(actions.messagesRecived(messages))
        }
    }

    return _newMessageHandler;
};

const newStatusHandlerCriator = (dispatch: Dispatch) => {
    if(_newStatusHandler === null) {
        _newStatusHandler = (status: StatusType) => {
            dispatch(actions.statusChanged(status))
        }
    }

    return _newStatusHandler;
};

type ThunkMusicType = ThunkType<actionsType>

export const startMessagesListining = ():ThunkMusicType => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messages-recived', newMessageHandlerCriator(dispatch));
    chatAPI.subscribe('status-changed', newStatusHandlerCriator(dispatch))
};

export const stopMessagesListining = ():ThunkMusicType => async (dispatch) => {
    chatAPI.stop();
    chatAPI.unSubscribe('messages-recived', newMessageHandlerCriator(dispatch))
    chatAPI.unSubscribe('status-changed', newMessageHandlerCriator(dispatch));
    dispatch(actions.resetMesseges([]))
};

export const sendMessage = (message: string):ThunkMusicType => async (dispatch) => {
    chatAPI.sendMessage(message);
};

export default chatReducer;

