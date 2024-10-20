import { connect } from "react-redux"
import { Navigate } from "react-router-dom"


let mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth
    }
}

const WithAuthRedirect = (Component) => {
    const AuthComponent = (props) => {
        if(!props.isAuth) return <Navigate to={'/login'} />
        return <Component {...props} />
    }

    let ConnectedComponent = connect(mapStateToProps)(AuthComponent);

    return ConnectedComponent;
};


export default WithAuthRedirect;