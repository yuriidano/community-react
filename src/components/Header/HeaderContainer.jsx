import { connect } from "react-redux";
import Header from "./Header";
import React from "react";
import { authMe, logout,} from "../../redux/auth-reducer";


class HeaderContainer extends React.Component {

    render() {
        return (
            <Header {...this.props} />
        )
    }
};



let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        login: state.auth.login,
        userId: state.auth.userId,
    };
};


export default connect(mapStateToProps, {logout}) (HeaderContainer);