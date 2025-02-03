import { FC } from "react";
import { PhotosType } from "../../types/types"
import musicPhoto from '../../assets/images/user.jpg'
import styless from './Music.module.scss'
import Preloader from "../common/Preloader/Preloader";

type PropsType = {
    name: string,
    id: number,
    photos: PhotosType,
    status: string,
    followed: boolean
};


export const Music:FC<PropsType> = ({photos, name}) => {
    if(!photos) <Preloader />
    return (
        <>
            <div className={styless.avatar}>
                <img src={photos.large ?? musicPhoto} alt="avatar" />
            </div>
            <div>{name}</div>
        </>
    )
};