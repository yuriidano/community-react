import axios from "axios"
import { ProfileType } from "../types/types"
import { instance } from "./api"


type NewsItemType = {
    source: {id: string, name: string},
    description: string,
    url: string,
}

type ResponseNewsType = {
    articles: NewsItemType[]
}

const KEY = 'ac5239de20328ba4dffeece6e28144ec'

export const infoApi = {
    getProfileInfo(userId: number) {
        return(
            instance.get<ProfileType>(`profile/${userId}`)
                .then(response => response.data)
        )
    },
    getNews() {
        return (
            axios.get<ResponseNewsType>(`https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=${KEY}`)
                .then(response => response.data)
        )
    }
}
