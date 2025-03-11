import { SubmitHandler, useForm } from "react-hook-form";
import { useAppDispatch} from "../../../../redux/redux-store";
import stylles from './PopapMessageForm.module.scss'
import classNames from "classnames";
import { useState } from "react";
import { sendMessage } from "../../../../redux/dialogs-reducer";

type PropsType = {
    userId: number | undefined
}

type FormType = {
    message: string,
}

export const PopapMessageForm = ({userId}: PropsType) => {
    const dispatch = useAppDispatch();
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormType>();

    const submit:SubmitHandler<FormType> = (data) => {
        if(userId) dispatch((sendMessage(userId, data.message)));
        reset({
            message: ''
        })
        setButtonIsDisabled(true)
    }


    const onSubmitKey = ( e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if(e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(submit)();
        }
    }   



    const inputHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
        let element = e.currentTarget;
        if(element.value !== '') {
          setButtonIsDisabled(false)
        } else {
          setButtonIsDisabled(true)
        }
    }

    return (
        <form className={stylles.form} onSubmit={handleSubmit(submit)}>
            <div className={stylles.formBody}>
                <textarea onKeyDown={onSubmitKey} onInput={inputHandler} {...register('message', { required: 'field is required' })} className={classNames(stylles.messageArea, { [stylles.error]: errors.message })}
                    placeholder="Send message..." ></textarea>
            </div>
            <div className={stylles.bottom}>
                <button disabled={buttonIsDisabled} className={classNames(stylles.button, { [stylles.buttonDisabled]: buttonIsDisabled })}>Send</button>
            </div>
        </form>
    )
}