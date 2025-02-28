import axios from "axios"

type PhotosType = {
    small: null | string,
    large: null | string
}

type MusicType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: string,
    followed: boolean
}

type ResponseTypeMusic = {
    items: MusicType[],
    totalCount: number,
    error: string | null
}


const instanceTest = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'df7dab77-f6e8-4bf9-b5ec-611106eb801d'
    }
});


export const musicAPI = {
    getMusicPop(pageSize = 3, currentPage = 1, term = '', friend: null | boolean = null) {
        return (
            instanceTest.get<ResponseTypeMusic>(`users?count=${pageSize}&page=${currentPage}&term=${term}` + (friend !== null ? `&friend=${friend}` : ''))
                .then(res => res.data)
        )
    }
}