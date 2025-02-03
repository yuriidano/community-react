import axios from "axios";


const instance = axios.create({
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

type MusicSType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: string,
    followed: boolean
}

type ResponseType = {
    items: Array<MusicSType>,
    totalCount: number,
    error: null | string
};


export const musicAPI = {
    getMusicPop(pageSize = 3, currentPage = 1, term = '', friend: null | boolean = null) {
        return (
            instance.get<ResponseType>(`users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend !== null ? `&friend=${friend}` : ''))
                .then(response => response.data)
        )
    }
}