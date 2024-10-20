import profileReducer, { addPostCriator, deleteMessage } from "./profile-reducer"


let state = {
    posts: [
        { id: 1, message: 'Hello world', likeCounter: 10 },
        { id: 2, message: 'My name is Yura', likeCounter: 2 },
    ]
};



it('after added message length should be increase', () => {
    //start data
    let action = addPostCriator('it-camasutra');

    //action
    let newState = profileReducer(state, action);

    //expection
    expect(newState.posts.length).toBe(3)
});


it('value should be correct', () => {
    //start data
    let action = addPostCriator('it-camasutra');

    //action
    let newState = profileReducer(state, action);

    //expection
    expect(newState.posts[2].message).toBe('it-camasutra');
});


it('should to be delete message', () => {
    //start data
    let action = deleteMessage(1);

    //action
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(1)
});


it('id should be correct', () => {
    //start data
    let action = deleteMessage(100);

    //action
    let newState = profileReducer(state, action);

    expect(newState.posts.length).toBe(2)
});