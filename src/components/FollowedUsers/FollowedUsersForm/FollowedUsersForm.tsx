import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styless from './FollowedUsersForm.module.scss'
import classNames from "classnames";
import { useAppSelector } from "../../../redux/redux-store";


type PropsUsersFormType = {
    onSearchUsers: (term: string) => void
};

type UsersFormType = {
    term: string,
};


export const FollowedUsersForm = (props: PropsUsersFormType) => {
    const term = useAppSelector(state => state.usersFollowedPage.term)

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UsersFormType>();

    useEffect(() => {
        reset({
            term: term,
        })
    }, [term])

    const submit:SubmitHandler<UsersFormType> = (formData) => {
        const { term } = formData;
        props.onSearchUsers(term)
    }

    return (
        <form className={styless.body} onSubmit={handleSubmit(submit)}>
            <input {...register('term', {maxLength: {value: 15, message: 'max symbols 15'}})} className={classNames(styless.term, 
             {[styless.error]: errors.term})} placeholder="search..." />
            { errors.term &&
                <span className={styless.errorSpan}>{errors.term.message}</span>
            }
            <button className={styless.button}>find</button>
        </form>
    )
};

