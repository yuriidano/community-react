import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { Textarea } from "../common/FormsControls/formsControls";
import styles from './Dialogs.module.scss';
import { maxLength, required } from "../../utils/validators/validators";
import { FormDataType } from "./Dialogs";
import { FC } from "react";

let maxLength50 = maxLength(50);

type PropsDialogsFormType = {}

const DialogsForm:FC<InjectedFormProps<FormDataType, PropsDialogsFormType> & PropsDialogsFormType> = (props) => {

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

let DialogsReduxForm = reduxForm<FormDataType, PropsDialogsFormType>({form: 'dialogs'})(DialogsForm);


export default DialogsReduxForm;