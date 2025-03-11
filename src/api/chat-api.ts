
type MessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
type StatusType = 'panding' | 'ready';
type EventsNamesType = 'messages-recived' | 'status-changed';
type subscriberMessagesType = (messages: MessageType[]) => void;
type subscriberStatusType = (status: StatusType) => void;

let wss: WebSocket;
let messageSubscribers: subscriberMessagesType[] = [];
let statusSubscribers: subscriberStatusType[] = [];

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data);
    messageSubscribers.forEach(s => s(newMessage))
};

const closeHandler = () => {
    cleanUp();
    setTimeout(() => {createChannel()}, 3000)
}

const openHandler = () => {
    statusChange("ready")
}

const cleanUp = () => {
    statusChange("panding");
    wss?.close();
    wss?.removeEventListener('close', closeHandler);
    wss?.removeEventListener('message', messageHandler);
    wss?.removeEventListener('message', messageHandler);
}
function statusChange(status: StatusType) {
    statusSubscribers.forEach(s => s(status));
}


function createChannel() {
    cleanUp();
    wss = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');
    wss?.addEventListener('close', closeHandler);
    wss?.addEventListener('open', openHandler);
    wss?.addEventListener('message', messageHandler);
};



export const chatAPI = {
    start() {
        createChannel();
    },
    stop() {
        cleanUp();
    },
    subscribe(eventName: EventsNamesType, callback: subscriberMessagesType | subscriberStatusType) {
        if (eventName === "messages-recived") {
            messageSubscribers.push(callback as subscriberMessagesType);
            return () => messageSubscribers = messageSubscribers.filter(sub => sub !== callback);
        } else {
            statusSubscribers.push(callback as subscriberStatusType);
            return () => statusSubscribers = statusSubscribers.filter(sub => sub !== callback);
        }
    },
    unSubscribe(eventName: EventsNamesType, callback: subscriberMessagesType | subscriberStatusType) {
        if (eventName === "messages-recived") {
            messageSubscribers = messageSubscribers.filter(sub => sub !== callback);
        } else {
            statusSubscribers = statusSubscribers.filter(sub => sub !== callback);
        }
    },


    
    sendMessage(message: string) {
        wss?.send(message)
    }
}




