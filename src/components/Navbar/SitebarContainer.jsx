import { compose } from "redux";
import Sitebar from "./Sitebar"
import { connect } from "react-redux";
import withAuthNavigate from "../../hoc/withAuthNavigate";


const SitebarContainer = (props) => {


    return (
        <Sitebar {...props} />
    )
};


const mapstateToProps = (state) => {
    return {}
}

export default compose(
    connect(mapstateToProps, {}),
    withAuthNavigate
)(SitebarContainer)