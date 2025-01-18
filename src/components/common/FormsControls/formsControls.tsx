import { Field, WrappedFieldProps } from 'redux-form';
import styles from './FormsControls.module.scss'
import { ValidatorsType } from '../../../utils/validators/validators';
import React from 'react';


const FormsControls = (Element: React.ComponentType<any>) => (props: WrappedFieldProps) => {

    let {meta: {touched, error}, input,   ...restProps} = props;
    let errors = touched && error;
    return (
        <div className={styles.formsControls + ' ' + (errors && styles.eror)} >
            <div className={styles.element}>{<Element {...input} {...restProps} />}</div>
            {errors && <span>{error}</span>}
        </div>
    )
};

export const Textarea = FormsControls((props) => <textarea {...props} />);
export const Input = FormsControls((props) => <input {...props} />);


export type ExtractKeysType<T> = Extract<keyof T, string>

export function createField<keysName extends string>(
                            marginBottom: number | undefined, 
                            component: React.ComponentType<WrappedFieldProps>, 
                            name: keysName, 
                            placeholder: string | undefined, 
                            validate: Array<ValidatorsType>, 
                            type: string | undefined, 
                            id: string | undefined
                        ) {
    return (
        <div style={{ marginBottom: `${marginBottom}px`}} >
            <Field component={component} name={name} placeholder={placeholder} type={type}
                validate={[...validate]} id={id}
            />
        </div>
    )
}