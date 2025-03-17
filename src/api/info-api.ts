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

const KEY = 'ad985db44b02452cbe2ac344683e2f29'

export const infoApi = {
    getProfileInfo(userId: number) {
        return(
            instance.get<ProfileType>(`profile/${userId}`)
                .then(response => response.data)
        )
    },
    getNews() {
        return (
            axios.get<ResponseNewsType>(`https://newsapi.org/v2/everything?pageSize=15&q=it&apiKey=${KEY}`)
                .then(response => response.data)
        )
    }
}
