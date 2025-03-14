import { SubmitHandler, useForm } from "react-hook-form";


const Settings = () => {
    return <></>
};


type formType = {
    key: string
}

const FormKey = () => {
    const {register, handleSubmit} = useForm<formType>()

    const submit:SubmitHandler<formType> = (data) => {

    }

    return (
        <form onSubmit={handleSubmit(submit)}>
            <input {...register('key')} />
        </form>
    )
}


export default Settings;