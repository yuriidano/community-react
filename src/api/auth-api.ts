import { AxiosResponse } from "axios"
import { instance, ResponseType, ResultCodeEnum } from "./api"


type DataLoginType = {
    userId: number
}

type DataAuthType = {
    id: number,
    email: string,
    login: string
}

export enum ResultCodeForCaptcha  {
    Captcha = 10
}

type CaptchaType = {
    url: string
}

type RegiserTipe = {

}
export let authApi = {
    authMe() {
        return (
            instance.get<ResponseType<ResultCodeEnum, DataAuthType>>('auth/me')
                .then((response) => response.data)
        )
    },

    login(email: string, password: string, rememberMe: boolean, captcha: null | string = null) {
        return (
            instance.post('auth/login', {email, password, rememberMe, captcha})
                .then((response: AxiosResponse<ResponseType<ResultCodeEnum | ResultCodeForCaptcha, DataLoginType>>) => {return response.data})
        )   
    },
    logout() {
        return (
            instance.delete('auth/login')
                .then((response: AxiosResponse<ResponseType>) => {return response.data})
        )   
    },
    captcha() {
        return (
            instance.get('security/get-captcha-url')
                .then((response: AxiosResponse<CaptchaType>) => response.data)
        )
    },
    register(Name: string, Email: string, Password: string, AcceptOffer: boolean) {
        return (
            instance.post<RegiserTipe>(`Auth/Auth/TryRegister`, {JoinModel: {Name, Email, Password, AcceptOffer}})
        )
    }

};


    //реєстрація нового користувача
    // const regis = (Name: string, Email: string, Password: string, AcceptOffer: boolean) => {
    //     axios.post(`https://social-network.samuraijs.com/Auth/Auth/TryRegister`, {JoinModel: {Name, Email, Password, AcceptOffer}}, {
    //         withCredentials: true,
    //         headers: {
    //             'API-KEY': 'df7dab77-f6e8-4bf9-b5ec-611106eb801d'
    //         }
    //     })
    //     .then(res => {

    //     })
    // }