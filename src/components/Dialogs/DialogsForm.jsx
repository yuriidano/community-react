import { Field, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/formsControls";
import styles from './Dialogs.module.scss';
import { maxLength, required } from "../../utils/validators/validators";

let maxLength50 = maxLength(50)

const DialogsForm = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>

            <div  className={styles.areaBody}>
                <Field id="textarea" name="message" component={Textarea} className={styles.area} 
                placeholder="write a message..." validate={[required, maxLength50]} />
            </div>
            <div>
                <button className={styles.button}>Send</button>
            </div>
        </form>
    )
};

let DialogsReduxForm = reduxForm({form: 'dialogs'})(DialogsForm);


export default DialogsReduxForm;