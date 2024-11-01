import { Field, reduxForm } from "redux-form"
import { maxLength, required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/formsControls";



let maxLength10 = maxLength(10)

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea}  name="myPosBody" 
                validate={[required, maxLength10]}
                />
            </div>
            <button>sent post</button>
        </form>
    )
};


let MyPostFeduxForm = reduxForm({form: 'myPost'})(MyPostForm);



export default MyPostFeduxForm;