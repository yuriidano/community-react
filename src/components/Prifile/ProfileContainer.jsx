import { connect } from "react-redux"
import Profile from "./Profile"
import React, { useEffect } from "react";
import { addPostCriator, getUserStatus, requestPhoto, requestProfile, updateProfile, updateUserStatus } from "../../redux/profile-reducer";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import { getAutoRizedUserId, getIsAuth, getIsUpdateProgress, getPosts, getProfile, getStatus } from "../../redux/profile-selectors";




let ProifleContainer = (props) => {
    let {userId} = useParams();
    let owner = userId;
    if(!userId ) {
        userId = props.autoRizedUserId; 
    };

    

    useEffect(() => {
        props.requestProfile(userId);
        props.getUserStatus(userId);
    }, [userId])

    
    
    return (
        
        <Profile {...props} isOwner={!owner} requestPhoto={props.requestPhoto} updateProfile={props.updateProfile} />
    )
}

let mapStateToProps = (state) => {
    
    return {
        status: getStatus(state),
        autoRizedUserId: getAutoRizedUserId(state),
        isAuth: getIsAuth(state),
        posts: getPosts(state),
        profile: getProfile(state),
        isUpdateProgress: getIsUpdateProgress(state)
    };
};
export default compose(
    connect(mapStateToProps, {getUserStatus, updateUserStatus, addPostCriator, requestProfile, requestPhoto, updateProfile}),
    withAuthNavigate,
) (ProifleContainer)

 




