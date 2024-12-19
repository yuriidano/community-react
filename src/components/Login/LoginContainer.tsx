import { compose } from "redux"
import Login from "./Login"
import { connect } from "react-redux"
import { login } from "../../redux/auth-reducer"
import { getCaptcha, getIsAuth } from "../../redux/auth-selectors"
import { AppStateType } from "../../redux/redux-store"
import { FC } from "react"


type MapStateType = {
    isAuth: boolean,
    captchaData:{url: string} | null
}
type MapDispatchType = {
    login: (email: string, password: string, rememberMy: boolean, captcha: string) => void,
}
type OwnPropsType = {}

type PropsType = MapStateType & MapDispatchType & OwnPropsType;


const LoginContainer: FC<PropsType> = (props) => {


    return (
<       Login {...props} />
    )
}




let mapStateToProps = (state: AppStateType):MapStateType =>     {
    
    return {
        isAuth: getIsAuth(state),
        captchaData: getCaptcha(state),
    }
}

export default compose(
    connect<MapStateType, MapDispatchType, PropsType, AppStateType>(mapStateToProps, {login})
) (LoginContainer)