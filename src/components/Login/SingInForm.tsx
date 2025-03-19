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



export const SingInForm = (props: PropsFormType) => {
    const dispatch = useAppDispatch();
    const clobalError = useAppSelector(state => state.auth.globalError);
    const isAuth = useAppSelector(state => state.auth.isAuth);
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
        <form className={styles.singInForm} onSubmit={handleSubmit(submit)} >
            <div className={styles.singInFormTop}>
                <div className={styles.loginEmail}>
                    <input {...register('email', { required: 'email required' })} placeholder='email...' />
                    {errors.email &&
                        <span className={styles.eror}>{errors.email.message}</span>
                    }
                </div>
                <div className={styles.loginPassword}>
                    <input {...register('password', { required: 'password required' })} type='password' placeholder='password...' />
                    {errors.password &&
                        <span className={styles.eror}>{errors.password.message}</span>
                    }
                </div>
                <div className={styles.loginFormBody}>
                    <div className={styles.rememberBody}>
                        <input className={styles.inputRemember} type='checkbox' {...register('rememberMy')} />
                        <span className={styles.loginRemember}>remember my</span>
                    </div>
                    <div className={styles.testData}>
                        <div className={styles.testDataTitle}>Test data</div>
                        <div className={styles.TestDataEmailBody}>
                            <div className={styles.TestDataEmaiTitle}>Email:</div>
                            <div className={styles.TestDataEmai}>free@samuraijs.com</div>
                        </div>
                        <div className={styles.TestDataPasswordBody}>
                            <div className={styles.TestDataPasswordTitle}>Password:</div>
                            <div className={styles.TestDataPassword}>free</div>
                        </div>
                    </div>
                </div>
                {props.captcha &&
                    <div className={styles.captchaBody}>
                        <div className={styles.captchaFoto}>
                            <img src={props.captcha} alt="captcha" />
                        </div>
                    </div>
                }
                {errors.root &&
                    <span className={styles.globalError}>{errors.root.message}</span>
                }
            </div>
            <div className={styles.singInFormBottom}>
                {props.captcha &&
                    <div className={styles.captcha}>
                        <input  {...register('captcha', { required: 'captcha required' })} placeholder='captcha...' />
                        {errors.captcha &&
                            <span className={styles.eror}>{errors.captcha.message}</span>
                        }
                    </div>
                }
                <div className={styles.loginButtonBody}>
                    <button className={styles.loginButton}>Sing in</button>
                </div>
            </div>
        </form>
    )
};


