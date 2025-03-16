import { useEffect } from 'react';
import { clearGlobalError, login, registration } from '../../redux/auth-reducer';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import styles from './Login.module.scss'
import { SubmitHandler, useForm } from 'react-hook-form';



export type FormDataType = {
    login: string,
    email: string, 
    password: string, 
}



export const SingUpForm = () => {
    const dispatch = useAppDispatch();
    const clobalError = useAppSelector(state => state.auth.globalError);
    const globalErrorSingUp = useAppSelector(state => state.auth.globalErrorSingUp)
    const isAuth = useAppSelector(state => state.auth.isAuth)
    const { register, handleSubmit, setError, formState: {errors}} = useForm<FormDataType>();


    useEffect(() => {
        if(globalErrorSingUp) {
            setError('root', {type: 'validate', message: globalErrorSingUp});
            dispatch(clearGlobalError())
        }

    }, [globalErrorSingUp, isAuth])

    const submit:SubmitHandler<FormDataType> = (formData) => {
        let {login, email, password} = formData;
        dispatch(registration(login, email, password));
    }
    
    return (
        <form className={styles.singUpForm} onSubmit={handleSubmit(submit)} >
            <div className={styles.singUpBody}>
            <div className={styles.loginPassword}>
                <input {...register('login', { required: 'login required' })} placeholder='your login...' />
                {errors.password &&
                    <span className={styles.eror}>{errors.password.message}</span>
                }
            </div>

            <div className={styles.loginEmail}>
                <input {...register('email', {required: 'email required'})} placeholder='your email...' />
                {errors.email &&
                    <span className={styles.eror}>{errors.email.message}</span>
                }
            </div>

            <div className={styles.loginPassword}>
                <input {...register('password', { required: 'password required' })} type='password' placeholder='your password...' />
                {errors.password &&
                    <span className={styles.eror}>{errors.password.message}</span>
                }
            </div>
            </div>

            <div className={styles.singUpBottom}>
                {errors.root &&
                    <span className={styles.globalErrorSingUp}>{errors.root.message}</span>
                }
                <div className={styles.loginButtonBody}>
                    <button className={styles.loginButton}>Sign up</button>
                </div>
            </div>
        </form>
    )
};


