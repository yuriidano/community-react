import { Navigate } from "react-router-dom";
import styles from './Login.module.scss';
import logo from '../../assets/images/logo.png'
import classNames from "classnames";
import { useAppSelector } from "../../redux/redux-store";
import { getCaptcha, getIsAuth } from "../../redux/auth-selectors";
import { SingInForm } from "./SingInForm";
import { useEffect, useState } from "react";
import { SingUpForm } from "./SingUpForm";
import CloseIcon from '@mui/icons-material/Close';



export const LoginPage = () => {
    const isAuth = useAppSelector(getIsAuth);
    const captchaState = useAppSelector(getCaptcha);
    const registrationAccept = useAppSelector(state => state.auth.registrationAccept);
    const [openPopap, setOpenPopap] = useState(false)
    const [activeForm, setActiveForm] = useState<'singIn' | 'singUn'>('singIn');


    useEffect(() => {
        if (registrationAccept === true) {
            debugger
            setActiveForm('singIn')
            setOpenPopap(true)
        }
        return () => {
            setActiveForm('singUn')
            setOpenPopap(false)
        }
    }, [registrationAccept])

    if (isAuth) return <Navigate to={'/profile'} />

    return (
        <div className={styles.login}>
            <div className={styles.container}>
                <div className={styles.body}>
                    <div className={styles.atributs}>
                        <a href="#" className={styles.logo}>
                            <img src={logo} alt="logo" />
                        </a>
                        <a href="#" className={styles.logoText}>Community React</a>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={() => setActiveForm("singIn")} className={classNames(styles.signIn, styles.sign)}>Sign In</button>
                        <button onClick={() => setActiveForm("singUn")} className={classNames(styles.signUp, styles.sign)}>Sign Up</button>
                    </div>
                </div>
            </div>
            <div className={styles.loginContainer}>
                <div className={classNames({ [styles.loginContent]: !captchaState, [styles.loginContentCaptcha]: captchaState })}>
                    {activeForm === 'singIn' ?
                        <div className={styles.titleBody}><h1 className={styles.title}>Sign in</h1>
                            {registrationAccept &&
                                <div className={styles.instruction}>
                                    <p onClick={() => setOpenPopap(true)}>Instruction</p>
                                    <div className={classNames(styles.popap, { [styles.openPopap]: openPopap })}>
                                        <div onClick={() => setOpenPopap(false)} className={styles.popapCloseIcon}><CloseIcon /></div>
                                        <p>
                                            Thank you for registration! Could you please check your Email: we've
                                            sent confirmaition message to you. Don't forget check SPAM-folder.
                                        </p>
                                        <p>
                                            To access all the features of our social network, you need to take one more step:
                                        </p>
                                        <p>
                                            <p>
                                                Go to your personal account → Account settings. Follow the link in the confirmation message we sent you by email
                                                (<a target="_blank" href="https://social-network.samuraijs.com/Auth/
                                            Account/ConfirmEmail/1f706eec-d43a-47fc-95db-3d9dc851dec5">
                                                    https://social-network.samuraijs.com/Auth/Account/ConfirmEmail/1f706eec-d43a-47fc-95db-3d9dc851dec5</a>).
                                            </p>
                                            <p>
                                                Generate a key.
                                            </p>
                                            <p>
                                                Enter the received key in a special form and save it on the settings page of the social network.
                                            </p>
                                            <p>Reload the page.</p>
                                        </p>
                                    </div>
                                </div>
                            }
                        </div>
                        :

                        activeForm === 'singUn' && <h1 className={styles.titleSingUp}>Sign up</h1>}

                    {activeForm === 'singIn' &&
                        <SingInForm captcha={captchaState} />
                    }
                    {activeForm === 'singUn' &&
                        <SingUpForm />
                    }
                </div>
            </div>
        </div>
    )
}



