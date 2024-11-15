import { reduxForm } from "redux-form"
import styles from './Login.module.scss'

import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/formsControls";


let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            <div className={styles.loginEmail}>
                {createField(null, Input, "email", "email...", [required], null)}
            </div>

            <div className={styles.loginPassword}>
                {createField(null, Input, "password", "password...", [required], null)}
            </div>

            <div className={styles.loginFormBody}>
                <div className={styles.loginRemember}>{createField(10, Input, "rememberMy", "password...", [], 'checkbox')}</div>
                <span className={styles.loginRemember}>remember my</span>
            </div>


            {props.captcha &&
                <div>
                    <div className={styles.captchaFoto}>
                        <img  src={props.captcha.url} alt="" />
                    </div>
                    <div  className={styles.captcha}>
                        {createField(10, Input, "captcha", "captcha...", [required], null)}
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

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export default LoginReduxForm;