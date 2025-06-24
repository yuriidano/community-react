import userPost from '../../../assets/images/icons/userPost.svg'
import plus from '../../../assets/images/icons/plus.svg'
import classNames from 'classnames';
import styles from './MyPosts.module.scss'
import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch } from '../../../redux/redux-store';
import { addPost } from '../../../redux/profile-reducer';

type MyPostFormType = {
    post: string
}

const MyPostForm = () => {
    const dispatch = useAppDispatch();

    const {register, handleSubmit, reset, formState: {errors} } = useForm<MyPostFormType>();

    const submit:SubmitHandler<MyPostFormType> = (formData) => {
        dispatch(addPost(formData.post));
        reset({
            post: ''
        })
    }
    return (
        <form onSubmit={handleSubmit(submit)}>
            <label htmlFor="post" className={styles.body}>
                <div className={styles.inputBody}>
                    <input {...register('post', { required: 'field is required', maxLength: { value: 200, message: 'max symbols 200' } })}
                        className={classNames(styles.input)} />
                    {errors.post &&
                        <span className={styles.errorSpan} >{errors.post.message}</span>
                    }
                </div>
                <button className={styles.button}>
                    <img src={plus} alt="icon" />
                </button>
                <div className={styles.userPost}>
                    <img src={userPost} alt="icon" />
                </div>
            </label>
        </form>
    )
};

export default MyPostForm;