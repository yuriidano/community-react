import { AxiosResponse } from "axios";
import { UserType } from "../types/types";
import { instance, ResponseType } from "./api";

type GetUsersType = {
    items: Array<UserType>,
    totalCount: number,
    error: null | string
}
export let usersApi = {
    getUsers(pageSize: number, currentPage: number) {
        return instance.get<GetUsersType>(`/users?count=${pageSize}&page=${currentPage}`)
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