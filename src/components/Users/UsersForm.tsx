import { useEffect } from "react";
import { FilterInitialType } from "../../redux/users-reducer"
import { SubmitHandler, useForm } from "react-hook-form";
import styless from './UsersForm.module.scss'
import classNames from "classnames";
import { useAppSelector } from "../../redux/redux-store";
import { getFilter } from "../../redux/users-selectors";


type PropsUsersFormType = {
    onSearchUsers: (filter: FilterInitialType) => void
};

type UsersFormType = {
    term: string,
    isFriend: null | boolean | string
};


const UsersForm = (props: PropsUsersFormType) => {
    const filter = useAppSelector(getFilter);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<UsersFormType>();

    useEffect(() => {
        reset({
            term: filter.term,
            isFriend: String(filter.friend)
        })
    }, [filter])

    const submit:SubmitHandler<UsersFormType> = (formData) => {
        const { isFriend, term } = formData;
        const friend = isFriend === 'null' ? null : isFriend === 'true' ? true : false;
        const filter = {friend, term};
        props.onSearchUsers(filter)
    }

    return (
        <form className={styless.body} onSubmit={handleSubmit(submit)}>
            <input {...register('term', {maxLength: {value: 15, message: 'max symbols 15'}})} className={classNames(styless.term, 
             {[styless.error]: errors.term})} placeholder="search..." />
            { errors.term &&
                <span className={styless.errorSpan}>{errors.term.message}</span>
            }

            <select {...register("isFriend")} className={styless.friend} >
                <option value="null">All</option>
                <option value="true">Friends</option>
                <option value="false">No friends</option>
            </select>
            <button className={styless.button}>find</button>
        </form>
    )
};


export default UsersForm;