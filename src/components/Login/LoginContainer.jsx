import { compose } from "redux"
import Login from "./Login"
import { connect } from "react-redux"
import { login } from "../../redux/auth-reducer"
import { getCaptcha, getIsAuth } from "../../redux/auth-selectors"






const LoginContainer = (props) => {


    return (
<       Login {...props} />
    )
}




let mapStateToProps = (state) =>     {
    
    return {
        isAuth: getIsAuth(state),
        captcha: getCaptcha(state)
    }
}

export default compose(
    connect(mapStateToProps, {login})
) (LoginContainer)