import axios from "axios";
import { useEffect, useState } from "react";


export enum ResultCodeEnum {
    Succes = 0,
    Error = 1
};

const apiKey = localStorage.getItem('key') || 'df7dab77-f6e8-4bf9-b5ec-611106eb801d';

 export const instance = axios.create({
     baseURL: 'https://social-network.samuraijs.com/api/1.0/',
     withCredentials: true,
     headers: {
         'API-KEY': apiKey
     }
 });


 export const instanceRegister = axios.create({
    baseURL: 'https://social-network.samuraijs.com/',
    withCredentials: true,
});


export type ResponseType<RC = ResultCodeEnum, D = {}> = {
    resultCode: RC
    messages: string[],
    data: D
}
















