import { Field } from 'redux-form';
import s from './FormsControls.module.scss'


const FormsControls = Element => props => {

    let {meta: {touched, error}, input,   ...restProps} = props;
    let errors = touched && error;
    return (
        <div className={s.formsControls + ' ' + (errors && s.eror)} >
            <div>{<Element {...input} {...restProps} />}</div>
            {errors && <span>{error}</span>}
        </div>
    )
};

export const Textarea = FormsControls('textarea');
export const Input = FormsControls('input');




export const createField = (marginBottom, component, name, placeholder, validate, type) => {
    return (
        <div style={{ marginBottom: `${marginBottom}px` }} >
            <Field component={component} name={name} placeholder={placeholder} type={type}
                validate={[...validate]}
            />
        </div>
    )
}