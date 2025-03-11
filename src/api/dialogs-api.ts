import { ProfileType } from "../types/types"
import { instance } from "./api"


//dialogs
//отримати всі діалоги
type DialogType = {
    id: number,
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number,
    photos: {small: string, large: string}
}
type ResponseGetAllDialogsType = DialogType[]


//отримати список повідомлень з вашим другом
//dialogs/{userId}/messages
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
type ResponseListMessagesWithFriend = {
    error: null | string,
    items: MessageType[],
    totalCount: number
}

//send message to your friend
//dialogs/{userId}/messages
// |
//delete only for you, not for your companion
//dialogs/messages/{messageId}
type ResponseMessageFriendType = {
    data: {
        message: MessageType
    },
    messages: [],
    fieldsErrors: [],
    resultCode: number
}


export const dialogsAPI = {
    getAllDialogs() {
        return (
            instance.get<ResponseGetAllDialogsType>(`dialogs`)
                .then(response => response.data)
        )
    },

    getListMessagesWithFriend(userId: number) {
        return (
            instance.get<ResponseListMessagesWithFriend>(`dialogs/${userId}/messages`)
                .then(response => response.data)
        )
    },

    postMessageFriend(userId: number, body: string) {
        return (
            instance.post<ResponseMessageFriendType>(`dialogs/${userId}/messages`, {body})
                .then(response => response.data)
        )
    },

    messageIsviewed(messageId: string) {
        return (
            instance.get<boolean>(`dialogs/messages/${messageId}/viewed`)
                .then(response => response.data)
        )
    },

    deleteMessage(messageId: string) {
        return (
            instance.delete<ResponseMessageFriendType>(`dialogs/messages/${messageId}`)
                .then(response => response.data)
        )
    },
    getProfile(userId: number) {
        return (
            instance.get<ProfileType>(`profile/${userId}`)
                .then(response => response.data)
        )
    },
}