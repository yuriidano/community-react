import { useEffect } from 'react';
import { clearGlobalError, login } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import styles from './Login.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form';



type PropsFormType = {
    captcha: string | null,
}

export type FormDataType = {
    email: string, 
    password: string, 
    rememberMy: boolean, 
    captcha: string | null
}



let LoginForm = (props: PropsFormType) => {
    const dispatch = useAppDispatch();
    const clobalError = useAppSelector(state => state.auth.globalError);
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const { register, handleSubmit, setError, formState: {errors}} = useForm<FormDataType>();


    useEffect(() => {
        if(clobalError) {
            setError('root', {type: 'validate', message: clobalError});
            dispatch(clearGlobalError())
        }

    }, [clobalError, isAuth])

    const submit:SubmitHandler<FormDataType> = (formData) => {
        let {email, password, rememberMy, captcha} = formData;
        let captchaForm = captcha === undefined ? null : captcha

        dispatch(login(email, password, rememberMy, captchaForm))
    }
    
    return (
        <form onSubmit={handleSubmit(submit)} >
            <div className={styles.loginEmail}>
                <input {...register('email', {required: 'email required'})} placeholder='email...' />
                {errors.email &&
                    <span className={styles.eror}>{errors.email.message}</span>
                }
            </div>

            <div className={styles.loginPassword}>
                <input {...register('password', {required: 'password required'})} type='password' placeholder='password...' />
                {errors.password &&
                    <span className={styles.eror}>{errors.password.message}</span>
                }
            </div>

            <div className={styles.loginFormBody}>
            <input type='checkbox' {...register('rememberMy')} />
                <span className={styles.loginRemember}>remember my</span>
            </div>


            {props.captcha &&
                <div className={styles.captchaBody}>
                    <div className={styles.captchaFoto}>
                        <img  src={props.captcha} alt="" />
                    </div>
                    <div className={styles.captcha}>
                        <input  {...register('captcha', { required: 'captcha required' })} placeholder='captcha...' />
                        {errors.captcha &&
                            <span className={styles.eror}>{errors.captcha.message}</span>
                        }
                    </div>
                </div>
            }
            {errors.root &&
                <span className={styles.globalError}>{errors.root.message}</span>
            }
            <div className={styles.loginButtonBody}>
                <button className={styles.loginButton}>login</button>
            </div>
        </form>
    )
};



export default LoginForm;