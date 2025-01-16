import axios from "axios";


export enum ResultCodeEnum {
    Succes = 0,
    Error = 1
};



export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'df7dab77-f6e8-4bf9-b5ec-611106eb801d'
    }
});



export type ResponseType<RC = ResultCodeEnum, D = {}> = {
    resultCode: RC
    messages: string[],
    data: D
}

















const instanceTets = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'df7dab77-f6e8-4bf9-b5ec-611106eb801d'
    }
});


type PhotosType = {
    small: null | string,
    large: null | string
}

 type ItemsType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: string,
    followed: boolean
}

type GetMusicPopType = {
    items: Array<ItemsType>,
    totalCount: number,
    error: null | string
};


export const MusicAPI = {
    getMusicPop: (pageSize = 3, currentPage = 1) => {
        return (
            instanceTets.get<GetMusicPopType>(`users?count=${pageSize}&page=${currentPage}`)
                .then(response => response.data)
        )
    }
};