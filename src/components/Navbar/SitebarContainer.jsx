import { compose } from "redux";
import Sitebar from "./Sitebar"
import { connect } from "react-redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";
import { getActiveMenu } from "../../redux/sitebar-selectors";
import { toggleActiveMenu } from "../../redux/header-reducer";


const SitebarContainer = (props) => {


    return (
        <Sitebar {...props} />
    )
};


const mapstateToProps = (state) => {
    return {
        activeMenu: getActiveMenu(state)
    }
}

export default compose(
    connect(mapstateToProps, {toggleActiveMenu}),
    withAuthNavigate
)(SitebarContainer)