import { FC } from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, Input } from "../common/FormsControls/formsControls";
import { required } from "../../utils/validators/validators";
import { FormDataType } from "./Musics";

type PropsType = {};

const MusicStatusForm:FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = (props) => {

    return (
        <form  onSubmit={props.handleSubmit} >
            {createField(10, Input, 'status', 'status...', [required], undefined, undefined)}
            {createField(10, Input, 'name', 'name...', [required], undefined, undefined)}
            <button>send</button>
        </form>
    )
};


const MusicStatusReduxForm = reduxForm<FormDataType, PropsType>({form: 'music'})(MusicStatusForm);

export default MusicStatusReduxForm;