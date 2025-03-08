import { Navigate } from "react-router-dom";
import LoginReduxForm from "./LoginForm";
import styles from './Login.module.scss';
import logo from '../../assets/images/logo.png'
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/redux-store";
import { getCaptcha, getIsAuth } from "../../redux/auth-selectors";
import { login } from "../../redux/auth-reducer";
import LoginForm from "./LoginForm";



export const LoginPage = () => {
   // const dispatch = useAppDispatch();
    const isAuth = useAppSelector(getIsAuth);
    const captchaState = useAppSelector(getCaptcha)

    // let sendLogin = (formData: FormDataType) => {
    //     let {email, password, rememberMy, captcha} = formData;
        
    //     dispatch(login(email, password, rememberMy, captcha))
    // }

    if(isAuth) return <Navigate to={'/profile'} />

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <a href="#" className={styles.logo}>
                        <img src={logo} alt="logo" />
                    </a>
                    <a href="#" className={styles.logoText}>Community React</a>
                </div>
            </div>
            <div className={classNames({ [styles.loginContent]: !captchaState, [styles.loginContentCaptcha]: captchaState })}>
                <h1 className={styles.title}>Sign in</h1>
                <LoginForm captcha={captchaState}  />
                <div className={styles.testData}>
                    <div className={styles.testDataTitle}>Test data</div>
                    <div className={styles.TestDataEmailBody}>
                        <div className={styles.TestDataEmaiTitle}>Email:</div>
                        <div className={styles.TestDataEmai}>free@samuraijs.com</div>
                    </div>
                    <div className={styles.TestDataPasswordBody}>
                        <div className={styles.TestDataPasswordTitle}>Password:</div>
                        <div className={styles.TestDataPassword}>free</div>
                    </div>
                </div>
            </div>
        </div>
    )
}



