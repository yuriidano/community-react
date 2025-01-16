import { FC, useEffect } from "react";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { MusicType, requestMusicPop } from "../../redux/music-reducer";
import { getIsFachingMusic, getMusicPop } from "../../redux/music-selectors";
import Musics from "./Musics";
import Preloader from "../common/Preloader/Preloader";

type MapStateType = {
    musicPop: Array<MusicType>,
    isFachingMusic: boolean
};
type MapDispatchType = {
    requestMusicPop: () => void
};
type OwnPropsType = {};
type PropsType = MapStateType & MapDispatchType & OwnPropsType;


const MusicContainer:FC<PropsType> = (props) => {
    useEffect(() => {
        props.requestMusicPop();

        return () => {}
    }, [])

    return <>
                {props.isFachingMusic && <Preloader />}
                <Musics {...props} />
           </>
};


const RedirectComponent = withAuthRedirect(MusicContainer);


const mapStateToProps = (state: AppStateType) => {
    return {
        musicPop: getMusicPop(state),
        isFachingMusic: getIsFachingMusic(state)
    }
}

export default connect(mapStateToProps, {requestMusicPop})(RedirectComponent)