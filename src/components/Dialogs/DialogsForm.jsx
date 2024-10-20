import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/formsControls";
import s from './Dialogs.module.scss';
import { maxLength, required } from "../../utils/validators/validators";

let maxLength50 = maxLength(50)

const DialogsForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name="message" component={Textarea} className={s.area}
                validate={[required, maxLength50]} />
            </div>
            <div>
                <button className={s.button}>Send</button>
            </div>
        </form>
    )
};

let DialogsReduxForm = reduxForm({form: 'dialogs'})(DialogsForm);


export default DialogsReduxForm;