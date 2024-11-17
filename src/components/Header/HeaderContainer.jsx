import { connect } from "react-redux";
import Header from "./Header";
import React from "react";
import { authMe, logout,} from "../../redux/auth-reducer";
import { compose } from "redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import { activeMenu, toggleActiveMenu } from "../../redux/header-reducer";
import { getActiveMenu, getIsAuth, getLogin, getUserId } from "../../redux/header-selectors";


class HeaderContainer extends React.Component {

    render() {
        return (
            <Header {...this.props} />
        )
    }
};



let mapStateToProps = (state) => {
    return {
        isAuth: getIsAuth(state),
        login: getLogin(state),
        userId: getUserId(state),
        activeMenu: getActiveMenu(state)
    };
};


export default compose(
    connect(mapStateToProps, {logout, toggleActiveMenu}),
    withAuthNavigate
) (HeaderContainer);

