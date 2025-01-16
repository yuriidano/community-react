import { FC } from "react"
import { connect } from "react-redux";
import { Navigate } from "react-router-dom"
import { AppStateType } from "../redux/redux-store";


type PropsType = {
    isAuth: boolean
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    };
};

const withAuthRedirect = (Element: React.ComponentType<any>) => {
    const RedirectComponent:FC<PropsType> = (props) => {
        if(!props.isAuth) return <Navigate to={'/login'} />

        return <Element {...props} />
    };

    const ConnectedComponent = connect(mapStateToProps)(RedirectComponent);

    return ConnectedComponent;
};


export default withAuthRedirect;