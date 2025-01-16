import { AxiosResponse } from "axios"
import { instance, ResponseType, ResultCodeEnum } from "./api"




//++++++++++++++++++++++++++++++++
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


export let authApi = {
    authMe() {
        return instance.get<ResponseType<ResultCodeEnum, DataAuthType>>('auth/me')
        .then((response) => response.data)
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
    }
};