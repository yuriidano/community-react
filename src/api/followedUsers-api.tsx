import { AxiosResponse } from "axios";
import { UserType } from "../types/types";
import { instance, ResponseType } from "./api";

type GetUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: null | string
}
export const followedUsersAPI = {
    getUsers(pageSize: number, currentPage: number, term: string = '', friend: null | boolean) {
        return instance.get<GetUsersType>(`/users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend !== null ? `&friend=${friend}` : ''))
            .then((response) => {
                return response.data;
            })
    },
    follow(userId: number) {
        return instance.post<ResponseType>(`follow/${userId}`, {},)
            .then((response) => {
                return response.data;
            })
    },

    unfollow(userId: number) {
        return instance.delete(`follow/${userId}`)
            .then((response: AxiosResponse<ResponseType>) => {
                return response.data;
            })
    }
};