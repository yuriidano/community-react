import { Field, reduxForm } from "redux-form"
import s from '../common/FormsControls/FormsControls.module.scss'

import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/formsControls";


let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            {createField(15, Input, "email", "email...", [required], null)}

            {createField(10, Input, "password", "password...", [required], null)}

            <div style={{display: 'flex', alignItems: 'flex-start', columnGap: '5px'}}>
            {createField(10, Input, "rememberMy", "password...", [required], 'checkbox')}<b>remember my</b>
            </div>


            {props.captcha &&
                <div>
                    <div style={{maxWidth: '150px'}} >
                        <img  style={{marginBottom: '5px', maxWidth: '100%'}} src={props.captcha.url} alt="" />
                    </div>
                    {createField(10, Input, "captcha", "captcha...", [required], null)}
                </div>
            }

            {props.error &&
                <div className={s.someFormError}>{props.error}</div>
            }
            <button>login</button>
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export default LoginReduxForm;