import axios from "axios";
import { useEffect, useState } from "react";


export enum ResultCodeEnum {
    Succes = 0,
    Error = 1
};




let apiKey = localStorage.getItem('key')
console.log(apiKey);

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
















