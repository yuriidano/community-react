
import { FC } from "react";
import { AppStateType } from "../../redux/redux-store";
import { connect } from "react-redux";
import { getCaptcha, getIsAuth } from "../../redux/auth-selectors";
import { login } from "../../redux/auth-reducer";
import Login from "./Login";



type MapStateType = {
    isAuth: boolean,
    captcha: null | string
};
type MapDispatchTYpe = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
};
type OwnPropsType = {};
type PropsLoginContainerType = MapStateType & MapDispatchTYpe & OwnPropsType;

const LoginContainer:FC<PropsLoginContainerType> = (props) => {


    return (
        <>
            <Login {...props} />
        </>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: getIsAuth(state),
        captcha: getCaptcha(state)
    }
}

export default connect(mapStateToProps, {login})(LoginContainer);