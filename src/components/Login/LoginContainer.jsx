import { compose } from "redux"
import Login from "./Login"
import { connect } from "react-redux"
import { login } from "../../redux/auth-reducer"






const LoginContainer = (props) => {


    return (
<       Login {...props} />
    )
}




let mapStateToProps = (state) => {
  
    return {
        isAuth: state.auth.isAuth,
    }
}

export default compose(
    connect(mapStateToProps, {login})
) (LoginContainer)