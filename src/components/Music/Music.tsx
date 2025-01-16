import { FC } from "react";
import { PhotosType } from "../../types/types"
import Preloader from "../common/Preloader/Preloader";
import musicPhoto from '../../assets/images/user.jpg'
import styles from './Music.module.scss'
import classNames from "classnames";

type PropsMusicType = {
        name: string,
        id: number,
        photos: PhotosType,
        status: string,
        followed: boolean
};

const Music:FC<PropsMusicType> = ({photos, name}) => {
    if(!photos) return <Preloader />

    return (
        <>
            <div className={classNames({[styles.avatar]: true})}>
                <img src={photos.large ?? musicPhoto} alt="avatar" />
            </div>
            <div>{name}</div>
        </>
    )
};



export default Music;