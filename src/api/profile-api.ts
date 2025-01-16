import { AxiosResponse } from "axios"
import { instance, ResponseType } from "./api"
import { ProfileType } from "../types/types"


export let profileApi = {

    getUserStatus(userId: number) {
        return (
            instance.get(`profile/status/${userId}`)
                .then((response: AxiosResponse<string>) => response.data)
        )
    },

    updateUserStatus(status: string) {
        return (
            instance.put<ResponseType>(`profile/status`, {status})
            .then(response => response.data)
        )
    },

    getProfile(userId: number) {
        return(
            instance.get<ProfileType>(`profile/${userId}`)
                .then(response => response.data)
        )
    },

    updagePhoto(filePhoto: File) {
        let formData = new FormData();
        formData.append('image', filePhoto)
        return (
            instance.put('profile/photo', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => response.data.data)
        )
    },

    updateProfile(profileData: ProfileType) {
        return (
            instance.put<ResponseType>('profile', {...profileData})
                .then(response => response.data)
        )
    }
}
