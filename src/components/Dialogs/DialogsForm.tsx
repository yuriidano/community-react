import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { createField, ExtractKeysType, Textarea } from "../common/FormsControls/formsControls";
import styles from './Dialogs.module.scss';
import { maxLength, required } from "../../utils/validators/validators";
import { FormDataType } from "./Dialogs";
import { FC } from "react";

let maxLength50 = maxLength(50);


type KeysType = ExtractKeysType<FormDataType>;

const DialogsForm:FC<InjectedFormProps<FormDataType, {}> & {}> = (props) => {

    return (
        <form onSubmit={props.handleSubmit}>

            <div  className={styles.areaBody}>
                {createField<KeysType>(undefined, Textarea, "message", "write a message...", [required, maxLength50], undefined, "textarea")}
            </div>
            <div>
                <button className={styles.button}>Send</button>
            </div>
        </form>
    )
};

let DialogsReduxForm = reduxForm<FormDataType, {}>({form: 'dialogs'})(DialogsForm);


export default DialogsReduxForm;