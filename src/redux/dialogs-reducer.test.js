import dialogsReducer, { deleteMessage, newMessage } from "./dialogs-reducer";


let state = {
    messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is you' },
        { id: 3, message: 'Yo' },
    ]
};


it('after added message length should be increase', () => {
    //start data
    let action = newMessage('hello my friends');

    //action
    let newState = dialogsReducer(state, action);

    //expection
    expect(newState.messages.length).toBe(4)
});


it('value should be correct', () => {
    //start data
    let action = newMessage('hello my friends');

    //action
    let newState = dialogsReducer(state, action);

    //expection
    expect(newState.messages[3].message).toBe('hello my friends')
});


it('should to be delete message', () => {
    //start data
    let action = deleteMessage(1);

    //action
    let newState = dialogsReducer(state, action);

    //expection
    expect(newState.messages.length).toBe(2)
});


it('id should be correct', () => {
    //start data
    let action = deleteMessage(1000);

    //action
    let newState = dialogsReducer(state, action);

    //expection
    expect(newState.messages.length).toBe(3)
});