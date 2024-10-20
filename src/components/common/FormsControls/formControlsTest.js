import s from './formControlsTest.module.scss'

let FormControls = (Element) => (props) => {
    let { meta: { touched, error }, input, ...restProps } = props;
    let errorEl = touched && error;
    return (
        <div className={s.formControls + ' ' + (errorEl && s.er)}>
            <div>
                <Element {...input} {...restProps} />
            </div>
           {errorEl && <span>{error}</span>}
        </div>
    )
};

export let Input = FormControls('input');