import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import stylles from './ChatForm.module.scss'
import classNames from "classnames";
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from "../../../redux/redux-store";
import { sendMessage } from "../../../redux/chat-reducer";

type FormData = {
    message: string
}

export const ChatForm = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(state => state.chat.status);
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true);

  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>();

  const submit:SubmitHandler<FormData> = (formData) => {
    const {message} = formData;
    dispatch(sendMessage(message))
    reset({message: ''})
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
    <>
      <form onSubmit={handleSubmit(submit)} className={stylles.form}>
        <div className={stylles.formBody}>
          <textarea onInput={inputHandler} {...register('message', { required: 'field is required' })} className={classNames(stylles.messageArea, { [stylles.error]: errors.message })}
          placeholder="Message" ></textarea>
        </div>
        <button  disabled={status !== "ready" || buttonIsDisabled} className={classNames(stylles.button, { [stylles.buttonDisabled]: buttonIsDisabled })} > 
          <SendIcon className={classNames(stylles.icon)}/>
        </button>
      </form>
    </>
  )
}