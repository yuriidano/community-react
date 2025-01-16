import { connect } from "react-redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import Info from "./Info";
import { compose } from "redux";
import { getProfile, getUserId } from "../../redux/info-selectors";
import { FC, useEffect } from "react";
import { requestProfileInfo } from "../../redux/info-reducer";
import { AppStateType } from "../../redux/redux-store";
import { ProfileType } from "../../types/types";

type MapStateType = {
    profile: ProfileType,
    userId: number 
}
type MapDispatchType = {
    requestProfileInfo: (userId: number) => void
};
type OwnPropsType = {}

type PropsType = MapStateType & MapDispatchType & OwnPropsType;




let InfoContainer: FC<PropsType> = (props) => {
    
    let userId = null;
    if(props.userId) {
        userId = props.userId
    }


    useEffect(() => {
        props.requestProfileInfo(props.userId)
    }, [])

    return (

        <>
            <Info {...props} />
        </>
    )
}

let mapStateToProps = (state: AppStateType): MapStateType => {
    return {
        profile: getProfile(state),
        userId: getUserId(state) ?? 0
    };
};
export default compose(
    connect<MapStateType, MapDispatchType, OwnPropsType, AppStateType>(mapStateToProps, {requestProfileInfo}),
    withAuthNavigate,
)(InfoContainer)






