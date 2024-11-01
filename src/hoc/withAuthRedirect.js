import { connect } from "react-redux";
import { Navigate } from "react-router-dom"


const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}


const withAuthRedirect = (Component) => {
    const RedirectComponent = (props) => {
        if(!props.isAuth) return <Navigate to={'/login'} />

        return <Component {...props} />
    };


    const ConnectedComponent = connect(mapStateToProps)(RedirectComponent);

    return ConnectedComponent;
};




export default withAuthRedirect;