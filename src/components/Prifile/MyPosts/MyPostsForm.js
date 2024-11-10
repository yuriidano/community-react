import { reduxForm } from "redux-form"
import { maxLength, required } from "../../../utils/validators/validators";
import { createField, Input, Textarea } from "../../common/FormsControls/formsControls";
import styles from './MyPosts.module.scss'
import plus from '../../../assets/images/icons/plus.svg'
import userPost from '../../../assets/images/icons/userPost.svg'


let maxLength200 = maxLength(200)

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <label for="post" className={styles.body}>
                <div  className={styles.input}>
                    {createField(null, Input, 'myPosBody', `What's on your mind?`, [required, maxLength200], null, 'post')}
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


let MyPostFeduxForm = reduxForm({form: 'myPost'})(MyPostForm);



export default MyPostFeduxForm;