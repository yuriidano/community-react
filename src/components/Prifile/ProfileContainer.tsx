import { connect } from "react-redux"
import Profile from "./Profile"
import  { FC, useEffect } from "react";
import { addPost, profileMount, requestPhoto, requestProfile, requestUserStatus, updateProfile, updateUserStatus } from "../../redux/profile-reducer";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import { getAutoRizedUserId, getIsAuth, getIsUpdateProgress, getPosts, getProfile, getProfileMy, getStatus } from "../../redux/profile-selectors";
import { AppStateType } from "../../redux/redux-store";
import { PostType, ProfileType } from "../../types/types";
import { strict } from "assert";

type ParamsType = {
    userId: string
}

type MapStateType = {
    status: string,
    autoRizedUserId: number,
    isAuth: boolean,
    posts: Array<PostType>,
    profile: ProfileType,
    isUpdateProgress: boolean,
    profileMy: ProfileType
}
type MapDispatchType = {
    requestProfile: (userId: string) => void,
    requestUserStatus: (userId: string) => void,
    profileMount: (profileMoutn: boolean) => void,
    requestPhoto: (filePhoto: any) => void,
    updateProfile: (profileData: ProfileType) => void,
    updateUserStatus: (status: string) => void,
    addPost: (data: string) => void,
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

         <Profile {...props} isOwner={!owner} requestPhoto={props.requestPhoto} updateProfile={props.updateProfile} />
    )
}

let mapStateToProps = (state: AppStateType) => {

    return {
        status: getStatus(state),
        autoRizedUserId: getAutoRizedUserId(state),
        isAuth: getIsAuth(state),
        posts: getPosts(state),
        profile: getProfile(state),
        isUpdateProgress: getIsUpdateProgress(state),
        profileMy: getProfileMy(state)

    };
};
export default compose(
    connect(mapStateToProps, {requestUserStatus, updateUserStatus, addPost, requestProfile, requestPhoto, updateProfile, profileMount}),
    withAuthNavigate,
) (ProifleContainer)

 




