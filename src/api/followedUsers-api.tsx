import { UserType } from "../types/types"
import { instance } from "./api"

type GetUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: null | string
}

export const followedUsersAPI = {
        getUsers(pageSize: number, currentPage: number, term: string = '', friend: boolean) {
            return instance.get<GetUsersType>(`/users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend !== null ? `&friend=${friend}` : ''))
                .then((response) => {
                    return response.data;
                })
        },
}