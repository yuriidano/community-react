import { InjectedFormProps, reduxForm } from "redux-form"
import { maxLength, required } from "../../../utils/validators/validators";
import { createField, Input, Textarea } from "../../common/FormsControls/formsControls";
import styles from './MyPosts.module.scss'
import plus from '../../../assets/images/icons/plus.svg'
import userPost from '../../../assets/images/icons/userPost.svg'
import { FC } from "react";
import { FormDataType } from "./MyPosts";


let maxLength200 = maxLength(200)

type PropsFormType = {};

const MyPostForm:FC<InjectedFormProps<FormDataType, PropsFormType> & PropsFormType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label htmlFor="post" className={styles.body}>
                <div  className={styles.input}>
                    {createField(undefined, Input, 'myPosBody', `What's on your mind?`, [required, maxLength200], undefined, 'post')}
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


let MyPostFeduxForm = reduxForm<FormDataType, PropsFormType>({form: 'myPost'})(MyPostForm);



export default MyPostFeduxForm;