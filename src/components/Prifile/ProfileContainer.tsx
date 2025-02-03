import { connect } from "react-redux"

import  { FC, useEffect } from "react";
import { profileMount, requestProfile, requestUserStatus} from "../../redux/profile-reducer";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import { getAutoRizedUserId } from "../../redux/profile-selectors";
import { AppStateType } from "../../redux/redux-store";
import Profile from "./Profile";
import withAuthRedirect from "../../hoc/withAuthRedirect";


type ParamsType = {
    userId: string
}

type MapStateType = {
    autoRizedUserId: number,
}
type MapDispatchType = {
    requestProfile: (userId: string) => void,
    requestUserStatus: (userId: string) => void,
    profileMount: (profileMoutn: boolean) => void,
}
type OwnType = {}
type PropsType = MapStateType & MapDispatchType & OwnType;

let ProifleContainer: FC<PropsType> = (props) => {

    let {userId} = useParams<ParamsType>();
    let owner = userId;
    if(!userId ) {
        userId = String(props.autoRizedUserId); 
    };


    useEffect(() => {
        props.requestProfile(userId);
        props.requestUserStatus(userId);
        props.profileMount(true);

        return () => {
            props.profileMount(false);
        }
    }, [userId])

    
    
    return (

        <>
            <Profile isOwner={!owner} />
        </>
    )
}

let mapStateToProps = (state: AppStateType) => {

    return {
        autoRizedUserId: getAutoRizedUserId(state),

    };
};
export default compose(
    connect(mapStateToProps, {requestUserStatus, requestProfile, profileMount}),
    withAuthRedirect,
) (ProifleContainer)

 




