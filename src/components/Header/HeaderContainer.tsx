import { connect } from "react-redux";
import Header from "./Header";
import React from "react";
import { logout,} from "../../redux/auth-reducer";
import { compose } from "redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import { toggleActiveMenu } from "../../redux/header-reducer";
import { getActiveMenu, getIsAuth, getLogin, getUserId } from "../../redux/header-selectors";
import { AppStateType } from "../../redux/redux-store";

type MapSatateType = {
    isAuth: boolean,
    login: string | null,
    userId: number | null,
    activeMenu: boolean
};

type MapDispatchType = {
    logout: () => void,
    toggleActiveMenu: () => void
};

type OwnPropsType = {};

type Propstype = MapDispatchType & MapSatateType & OwnPropsType;




class HeaderContainer extends React.Component<Propstype> {

    render() {
        return (
            <Header {...this.props} />
        )
    }
};



let mapStateToProps = (state: AppStateType): MapSatateType => {
    return {
        isAuth: getIsAuth(state),
        login: getLogin(state),
        userId: getUserId(state),
        activeMenu: getActiveMenu(state)
    };
};


export default compose(
    connect<MapSatateType, MapDispatchType, OwnPropsType, AppStateType>(mapStateToProps, {logout, toggleActiveMenu}),
    withAuthNavigate
) (HeaderContainer);

