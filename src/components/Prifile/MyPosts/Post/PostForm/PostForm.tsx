import { SubmitHandler, useForm } from "react-hook-form"
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from "react";
import stylles from './PostForm.module.scss'
import { useAppDispatch } from "../../../../../redux/redux-store";

type PropsType = {
    setEditMode: (value: boolean) => void,
    message: string,
    onUpdatePost: (formData: string) => void,
}

type FormType = {
    post: string
}

export const PostForm = ({setEditMode, message, onUpdatePost}: PropsType) => {
    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormType>();

    useEffect(() => {
        reset({
            post: message
        })
    }, [message])

    const closeHandler = () => {
        setEditMode(false);
    }

    const submit:SubmitHandler<FormType> = (formData) => {
        setEditMode(false);
        onUpdatePost(formData.post)
    }


    return (
        <form onSubmit={handleSubmit(submit)} className={stylles.form}>
            <div className={stylles.bodyInput}>
                <input autoFocus={true} className={stylles.input} type="text" {...register('post', { required: 'field is required' })} />
            </div>
            <div className={stylles.buttons}>
                <div  className={stylles.closeButtom} onClick={closeHandler}><CloseIcon /></div>
                <button className={stylles.sendButtom}><SendIcon /></button>
            </div>
        </form>
    )
}

