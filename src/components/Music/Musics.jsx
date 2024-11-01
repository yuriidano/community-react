import Preloader from "../common/Preloader/Preloader";
import Music from "./Music";
import MusicReduxForm from "./MusicForm";
import LoginReduxForm from "./MusicForm";


const Musics = ({musicPop, isFeching, SumeError}) => {

    let onSubmit = (formData) => {
        SumeError()
    }

    return (
        <>
            {
                isFeching && <Preloader />
            }
            {
                musicPop.map(music => {
                    return (
                        <Music {...music} />
                    )
                })
            }
            <MusicReduxForm onSubmit={onSubmit} />
        </>
    )
};



export default Musics;