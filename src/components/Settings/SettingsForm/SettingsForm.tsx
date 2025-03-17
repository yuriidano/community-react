import { SubmitHandler, useForm } from "react-hook-form"
import stylles from './SettingsForm.module.scss'
import { useState } from "react"
import classNames from "classnames"


type formType = {
    key: string
}

export const SettingsForm = () => {
    const {register, handleSubmit, reset} = useForm<formType>()
    const [buttonIsDisabled, setButtonIsDisabled] = useState(true);
    const [openPopap, setOpenPopap] = useState(false)


    const submit:SubmitHandler<formType> = (data) => {
        if(data.key !== '') {
            localStorage.setItem('key', data.key);
        }
        setTimeout(() => {setButtonIsDisabled(true)}, 30);
        reset({
            key: ''
        })
    }


    const inputHandler = (e: React.FormEvent<HTMLInputElement>) => {
        let element = e.currentTarget;
        if(element.value !== '') {
          setButtonIsDisabled(false)
        } else {
          setButtonIsDisabled(true)
        }
      }

    return (
        <form onSubmit={handleSubmit(submit)} className={stylles.form}>
            <input onInput={inputHandler} className={stylles.input} {...register('key')} placeholder="enter key..." />
            <button onClick={() => setOpenPopap(true)} disabled={buttonIsDisabled} className={classNames(stylles.button, {[stylles.buttonDisabled]: buttonIsDisabled})}
            >Save</button>
            <div className={classNames(stylles.popap, {[stylles.openPopap]: openPopap})}>
                <p>The key is saved.</p>
                {/* <div onClick={() => setOpenPopap(false)} className={stylles.messagePopupCloseIcon}><CloseIcon /></div> */}
                <button className={stylles.messagePopupClose} onClick={() => setOpenPopap(false)}>Ok</button>
            </div>
        </form>
    )
}