import { InjectedFormProps, reduxForm } from "redux-form"
import styles from './Login.module.scss'

import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/formsControls";
import { FC } from "react";
import { FormDataType } from "./LoginPage";


type PropsLoginFormType = {
    captcha: string | null,
};

type KeysNamesType = Extract<keyof FormDataType, string>

let LoginForm:FC<InjectedFormProps<FormDataType, PropsLoginFormType> &PropsLoginFormType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div className={styles.loginEmail}>
                {createField<KeysNamesType>(undefined, Input, "email", "email...", [required], undefined, undefined)}
            </div>

            <div className={styles.loginPassword}>
                {createField<KeysNamesType>(undefined, Input, "password", "password...", [required], 'password', undefined)}
            </div>

            <div className={styles.loginFormBody}>
                <div className={styles.loginRemember}>{createField<KeysNamesType>(10, Input, "rememberMy", undefined, [], 'checkbox', undefined)}</div>
                <span className={styles.loginRemember}>remember my</span>
            </div>


            {props.captcha &&
                <div>
                    <div className={styles.captchaFoto}>
                        <img  src={props.captcha} alt="" />
                    </div>
                    <div  className={styles.captcha}>
                        {createField<KeysNamesType>(10, Input, "captcha", "captcha...", [required], undefined, undefined)}
                    </div>
                </div>
            }

            <div className={styles.someFormError}>
                {props.error &&
                    <div >{props.error}</div>
                }
            </div>
            <div className={styles.loginButtonBody}>
                <button className={styles.loginButton}>login</button>
            </div>
        </form>
    )
};

const LoginReduxForm = reduxForm<FormDataType, PropsLoginFormType>({form: 'login'})(LoginForm);

export default LoginReduxForm;