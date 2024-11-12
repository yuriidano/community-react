import { Navigate } from "react-router-dom";
import LoginReduxForm from "./LoginForm";
import styles from './Login.module.scss';
import logo from '../../assets/images/logo.png'


let Login = (props) => {
    let sendLogin = (formData) => {
        let {email, password, rememberMy, captcha} = formData;
        props.login(email, password, rememberMy, captcha);
    }

    if(props.isAuth) return <Navigate to={'/profile'} />

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                {/* <div className={styles.body}>
                    <a href="#" className={styles.logo}>
                        <img src={logo} alt="logo" />
                    </a>
                    <a href="#" className={styles.logoText}>Community React</a>
                </div> */}
                <div className={styles.loginContent}>
                    <h1 className={styles.title}>Sign in</h1>
                    <LoginReduxForm captcha={props.captcha} onSubmit={sendLogin} />
                </div>
            </div>
        </div>
    )
}



export default Login;