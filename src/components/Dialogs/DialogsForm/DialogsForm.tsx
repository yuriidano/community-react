import { SubmitHandler, useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../../redux/redux-store"
import SendIcon from '@mui/icons-material/Send';
import { useState } from "react";
import stylles from './DialogsForm.module.scss'
import classNames from "classnames";
import { sendMessage } from "../../../redux/dialogs-reducer";

type FormType = {
    message: string,

}

export const DialogsForm = () => {
    const dispatch = useAppDispatch();
    const currentDialogId = useAppSelector(state => state.dialogsPage.currentDialogId);
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormType>();

    const submit:SubmitHandler<FormType> = (data) => {
        if(currentDialogId) dispatch((sendMessage(currentDialogId, data.message)));
        reset({
            message: ''
        })
        setButtonIsDisabled(true)
    }

    const inputHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
        let element = e.currentTarget;
        if(element.value !== '') {
          setButtonIsDisabled(false)
        } else {
          setButtonIsDisabled(true)
        }
        element.style.height = "auto"; // Скидаємо висоту
        element.style.height = element.scrollHeight + "px"; // Встановлюємо нову висоту
      }

    return (
        <form className={stylles.form} onSubmit={handleSubmit(submit)}>
            <div className={stylles.formBody}>
                <textarea onInput={inputHandler} {...register('message', { required: 'field is required'})} className={classNames(stylles.messageArea, { [stylles.error]: errors.message })}
                    placeholder="Message" ></textarea>
            </div>
            <button disabled={buttonIsDisabled} className={classNames(stylles.button, { [stylles.buttonDisabled]: buttonIsDisabled })} >
                <SendIcon className={classNames(stylles.icon)} />
            </button>
        </form>
    )
}