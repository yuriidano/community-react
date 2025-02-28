
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
let subscribers = {
    'messages-recived': [] as subscriberMessagesType[],
    'status-changed': [] as subscriberStatusType[]
};

const messageHandler = (e: MessageEvent) => {
    const newMessage = JSON.parse(e.data);
    subscribers["messages-recived"].forEach(s => s(newMessage))
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
function statusChange(status: StatusType)  {
    subscribers["status-changed"].forEach(s => s(status))
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
        (subscribers[eventName] as (subscriberMessagesType | subscriberStatusType)[]).push(callback);

        return (eventName: EventsNamesType, callback: subscriberMessagesType | subscriberStatusType) => {
            subscribers[eventName].filter(s => s !== callback)
        }
    },
    unSubscribe(eventName: EventsNamesType, callback: subscriberMessagesType | subscriberStatusType) {
        subscribers[eventName].filter(s => s !== callback)
    },
    sendMessage(message: string) {
        wss?.send(message)
    }
}




