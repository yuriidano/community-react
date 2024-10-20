import { Field, reduxForm } from "redux-form"
import s from '../common/FormsControls/FormsControls.module.scss'

import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/formsControls";


let LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} >
            {createField(15, Input, "email", "email...", [required], null)}

            {createField(10, Input, "password", "password...", [required], null)}

            {createField(10, Input, "rememberMy", "password...", [required], 'checkbox')}
            {props.error &&
                <div className={s.someFormError}>{props.error}</div>
            }
            <button>login</button>
        </form>
    )
};

const LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

export default LoginReduxForm;