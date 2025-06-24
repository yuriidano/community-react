export type PhotosType = {
    small: string | null,
    large: string | null
}

export type UserType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: string,
    followed: boolean
}

export type ContactsType = {
    [key : string]: string | null,

}

export type ProfileType = {
    aboutMe: string,
    userId: number,
    lookingForAJob: boolean,
    lookingForAJobDescription: string,
    fullName: string,
    contacts: ContactsType,
    photos: PhotosType
}

export type PostType = {
    id: number,
    message: string,
}


