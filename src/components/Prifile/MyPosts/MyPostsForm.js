import { Field, reduxForm } from "redux-form"
//import { Textarea } from "../../common/FormsControls/formsControls";
//import { maxWidthCriator, required } from "../../../utils/validators/validations";

//let maxLength10 = maxWidthCriator(10)

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field /*>component={Textarea}*/  component={'textarea'} name="myPosBody" 
                //validate={[required, maxLength10]}
                />
            </div>
            <button>sent post</button>
        </form>
    )
};


let MyPostFeduxForm = reduxForm({form: 'myPost'})(MyPostForm);



export default MyPostFeduxForm;