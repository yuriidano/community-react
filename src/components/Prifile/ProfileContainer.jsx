import { connect } from "react-redux"
import Profile from "./Profile"
import React, { useEffect } from "react";
import { addPostCriator, getProfileId, getUserStatus, updateUserStatus } from "../../redux/profile-reducer";
import { useParams } from "react-router-dom";
import { compose } from "redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import { getAutoRizedUserId, getIsAuth, getProfile, getStatus } from "../../redux/profile-selectors";





let ProifleContainer = (props) => {
    let {userId} = useParams();
    if(!userId ) {
        userId = props.autoRizedUserId; //31356
    };

    useEffect(() => {
        props.getProfileId(userId);
        props.getUserStatus(userId);
    }, [userId])

    
    
    return (
        
        <Profile {...props} />
    )
}

let mapStateToProps = (state) => {
    return {
        profile: getProfile(state),
        status: getStatus(state),
        autoRizedUserId: getAutoRizedUserId(state),
        isAuth: getIsAuth(state),
        posts: state.profilePage.posts
    };
};
export default compose(
    connect(mapStateToProps, {getProfileId, getUserStatus, updateUserStatus, addPostCriator}),
    withAuthNavigate,
) (ProifleContainer)

 






// class ProifleContainer extends React.Component {
//     constructor(props) {
//         super(props)
//     }

//     componentDidMount() {
//         axios.get(`https://social-network.samuraijs.com/api/1.0/profile/2`)
//             .then((response) => {
//                 this.props.setUserProfile(response.data)
//             })
//     }


//     render() {
//         return (
//             <Profile {...this.props} />
//         )
//     }
// }