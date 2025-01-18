import appReducer, { actions, initialiseSucces } from "./app-reducer"



it('initialise should be correct', () => {
    //start data

    let state = {
        initialize: false
    }

    let action = actions.initialiseSucces(true);
    //action
    let newState = appReducer(state, action)
    //exeption
    expect(newState.initialize).toBe(true)
})





