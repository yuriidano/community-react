import { SubmitHandler, useForm } from "react-hook-form";


const Settings = () => {
    return (
        <>
            <FormKey />
        </>
    )
};


type formType = {
    key: string
}

const FormKey = () => {
    const {register, handleSubmit, reset} = useForm<formType>()

    const submit:SubmitHandler<formType> = (data) => {
        localStorage.setItem('key', data.key);
        reset({key: ''})
    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <input {...register('key')} />
            <button>send</button>
        </form>
    )
}


export default Settings;