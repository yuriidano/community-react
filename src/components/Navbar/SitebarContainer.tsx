import { compose } from "redux";
import Sitebar from "./Sitebar"
import { connect } from "react-redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import { getActiveMenu } from "../../redux/sitebar-selectors";
import { toggleActiveMenu } from "../../redux/header-reducer";
import { AppStateType } from "../../redux/redux-store";
import { FC } from "react";

type MapStateType = {
    activeMenu: boolean
}
type MapDispatchType = {
    toggleActiveMenu: () => void
};
type OwnPropsType = {};
type PropsType = MapStateType & MapDispatchType & OwnPropsType;


const SitebarContainer: FC<PropsType> = (props) => {

    return (
        <Sitebar {...props} />
    )
};


const mapstateToProps = (state: AppStateType):MapStateType => {
    return {
        activeMenu: getActiveMenu(state)
    }
}

export default compose(
    connect<MapStateType, MapDispatchType, OwnPropsType, AppStateType>(mapstateToProps, {toggleActiveMenu}),
    withAuthNavigate
)(SitebarContainer)