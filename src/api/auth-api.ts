import { AxiosResponse } from "axios"
import { instance, instanceRegister, ResponseType, ResultCodeEnum } from "./api"


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

type RegiserType = {
    Response: [
        { 
            k: string, //"1" 
            v: boolean   //true - все ок   //false - не ок
        },
        { //цей обєкт приходить коли помилка
            k: string, //"3"    
            v: [
                {
                    message: string //"Sorry, this Login is already in use"
                }
            ]
        }
    ],
    Extra: {
        email?: "39.24121@ukr.net", //ці ключі зявляються коли все ок
        password?: "Yurad1988plmo" //ці ключі зявляються коли все ок
    },
    ShowSuccessSlideBox: boolean
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
            instanceRegister.post<RegiserType>(`Auth/Auth/TryRegister`, {JoinModel: {Name, Email, Password, AcceptOffer}})
                .then(response => response.data)
        )
    }

};

