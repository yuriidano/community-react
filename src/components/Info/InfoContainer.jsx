import { connect } from "react-redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import Info from "./Info";
import { compose } from "redux";
import { getProfile, getUserId } from "../../redux/info-selectors";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { requestProfileInfo } from "../../redux/info-reducer";


let InfoContainer = (props) => {
    
    let userId = null;
    if(props.userId) {
        userId = props.userId
    }


    useEffect(() => {
        props.requestProfileInfo(props.userId)
    }, [])

    return (

        <Info {...props} />
    )
}

let mapStateToProps = (state) => {

    return {
        profile: getProfile(state),
        userId: getUserId(state)
    };
};
export default compose(
    connect(mapStateToProps, {requestProfileInfo}),
    withAuthNavigate,
)(InfoContainer)






