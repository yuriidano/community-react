import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { AppStateType } from "../redux/redux-store";
import { FC } from "react";

let mapStateToPropsForAuthComponent = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

type PropsNavigateComponentType = {
    isAuth: boolean
}

let withAuthNavigate = (Component: any) => {

    let navigateComponent: FC<PropsNavigateComponentType> = (props) => {
        if(!props.isAuth) return <Navigate to={'/login'} />;

        return <Component {...props} />
    }

    let ConnectedAuthComponent = connect(mapStateToPropsForAuthComponent) (navigateComponent);

    return ConnectedAuthComponent;
};



export default withAuthNavigate;