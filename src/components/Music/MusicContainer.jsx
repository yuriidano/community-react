import { compose } from "redux";
import Musics from "./Musics"
import { connect } from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import { getMusicPop, getToggleIsFaching } from "../../redux/music-selectors";
import { requestMusic } from "../../redux/music-reducer";
import { useEffect } from "react";
import { SumeError } from "../../redux/profile-reducer";


const MusicContainer = (props) => {
    
    useEffect(() => {
        props.requestMusic();
    }, [])

    return (
        <>
            <Musics {...props} />
        </>
    )
};



const mapStateToProps = (state) => {
    return {
        musicPop: getMusicPop(state),
        isFeching: getToggleIsFaching(state)
    }
}


export default compose(
    connect(mapStateToProps, {requestMusic, SumeError}),
    withAuthRedirect
)(MusicContainer)