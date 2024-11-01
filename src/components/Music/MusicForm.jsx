import { Field, reduxForm } from "redux-form";
import { createFieldTest, Input } from "../common/FormsControls/frmsControlsTest";
import { maxLengthTest, required } from "../../utils/validators/validatorsTest";
import s from './music.module.scss';
let maxLengthTest10 = maxLengthTest(10);


const MusicForm = (props) => {
    return (
        <>
            <form onSubmit={props.handleSubmit} style={{marginTop: '15px'}}>
                {createFieldTest(Input, 'login', 'login...', [required, maxLengthTest10])}
                {createFieldTest(Input, 'logpassword', 'logpassword...', [required, maxLengthTest10])}
                <button>Send</button>
                {   props.error &&
                    <div className={s.someError} >
                        {props.error}
                    </div>
                }
            </form>
        </>
    )
}


let MusicReduxForm = reduxForm({form: 'music'})(MusicForm);



export default MusicReduxForm;