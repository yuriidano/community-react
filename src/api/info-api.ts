import { ProfileType } from "../types/types"
import { instance } from "./api"

export const infoApi = {
    getProfileInfo(userId: number) {
        return(
            instance.get<ProfileType>(`profile/${userId}`)
                .then(response => response.data)
        )
    },
}
