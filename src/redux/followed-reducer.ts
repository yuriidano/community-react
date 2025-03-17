import { UserType } from "../types/types";
import { InferActionsTypes, ThunkType } from "./redux-store";
import { usersApi } from "../api/users-api";

type NulbleType<T> = null | T;

let initialState = {
    users: [] as Array<UserType>,
    pageSize: 3,
    currentPage: 1,
    filter: {
        term: '',
        friend: null as NulbleType<boolean>
    }
};


type InitialStateType = typeof initialState;
export type FilterInitialType = typeof initialState.filter;

let usersFollowedReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case 'usersFollowed/SET_USERS':
            return {
                ...state,
                users: action.users,
            }
        default:
            return state;
    }
};

type ActionsTypes = InferActionsTypes<typeof actions>;


export const actions = {
    setUsers: (users: Array<UserType>) => ({type: 'usersFollowed/SET_USERS', users} as const),
}





type ThunkTypeUsers = ThunkType<ActionsTypes>;

export const requestUsersFollowed = (pageSize: number, currentPage: number, filter: FilterInitialType):ThunkTypeUsers => async (dispatch) => {
    let data = await usersApi.getUsers(pageSize, currentPage, filter.term, filter.friend)
    dispatch(actions.setUsers(data.items));
};






export default usersFollowedReducer;