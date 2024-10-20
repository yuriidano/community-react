import usersReducer, { followAccept, setCurrentPage, setTotalUsersCount, setUsers, toggleIsFeching, unfollowAccept } from "./users-reducer";

let state = {
    users: [{id: 1, name: 'Ola', followed: false}, {id: 1, name: 'Yura', followed: false}],
    totalUsersCount: 20,
    pageSize: 100,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
};


it('follow should be correct', () => {
    //start data
    let action = followAccept(1);

    //action
    let newState = usersReducer(state, action);

    //expect
    expect(newState.users[1].followed).toBe(true)    
});

it('unfollow should be correct', () => {
    //start data
    let action = unfollowAccept(1);

    //action
    let newState = usersReducer(state, action);

    //expect
    expect(newState.users[1].followed).toBe(false)    
})

it('after added array length should be increase', () => {
    //start data
    let action = setUsers([{}, {}, {}]);

    //action
    let newState = usersReducer(state, action);

    //expect
    expect(newState.users.length).toBe(3)    
});

it('the value currentPage should change', () => {
    //start data
    let action = setCurrentPage(2);

    //action
    let newState = usersReducer(state, action);

    //expect
    expect(newState.currentPage).toBe(2)    
});

it('the value currentPage should change', () => {
    //start data
    let action = setTotalUsersCount(10);

    //action
    let newState = usersReducer(state, action);

    //expect
    expect(newState.totalUsersCount).toBe(10)    
});

it('follow should be correct', () => {
    //start data
    let action = toggleIsFeching(true);

    //action
    let newState = usersReducer(state, action);

    //expection
    expect(newState.isFetching).toBe(true)
})