import axios from "axios";


export enum ResultCodeEnum {
    Succes = 0,
    Error = 1
};

const key = localStorage.getItem('key');

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': key
    }
});


export type ResponseType<RC = ResultCodeEnum, D = {}> = {
    resultCode: RC
    messages: string[],
    data: D
}
















