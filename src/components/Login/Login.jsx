import { Navigate } from "react-router-dom";
import LoginReduxForm from "./LoginForm";


let Login = (props) => {

    let sendLogin = (formData) => {
        let {email, password, rememberMy} = formData;
        props.login(email, password, rememberMy);
    }

    if(props.isAuth) return <Navigate to={'/profile'} />

    return (
        <div style={{backgroundColor: 'RGB(94, 150, 242)', minHeight: '100%', padding: '15px'}}>
            <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>LOGIN</h1>
            <LoginReduxForm  onSubmit={sendLogin} />
        </div>
    )
}



export default Login;