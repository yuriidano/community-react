import { FC } from "react";
import { MusicType } from "../../redux/music-reducer"
import Music from "./Music";
import MusicStatusReduxForm from "./MusicStatusForm";

type PropsMusicsType = {
    musicPop: Array<MusicType>,
    requestMusicPop: () => void
};

export type FormDataType = {
    status: string,
    name: string
}

const Musics:FC<PropsMusicsType> = (props) => {

    const onSubmit = (formData: FormDataType) => {
        console.log(formData);
    }
    return (
        <>
            {
                props.musicPop.map(music => <Music {...music} />)
            }
            <MusicStatusReduxForm  onSubmit={onSubmit} />
        </>
    )
};


export default Musics;