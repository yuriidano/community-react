import { Field } from 'redux-form';
import s from './FormsControlsTest.module.scss'

const formControl = (Element) => (props) => {
    let {input, meta, ...restProps} = props;
    let eror = meta.touched && meta.error;
    return (
        <div className={s.formControls + ' ' + (eror && s.errore)}  >
            <div>
                <Element {...input} {...restProps} />
            </div>
            <div>
               { eror &&
                 <span>{meta.error}</span>
               }
            </div>
        </div>
    )
};

export const Input = formControl('input');




export const createFieldTest = (component, name, placeholder, validateArray) => {
    return (
        <div>
            <Field component={component} name={name} placeholder={placeholder}
                validate={[...validateArray]} />
        </div>
    )
}

// [required, maxLengthTest10]

