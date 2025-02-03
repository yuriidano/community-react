import { FC, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styless from './Music.module.scss'
import classNames from "classnames";
import { useAppSelector } from "../../redux/redux-store";
import { FilterType } from "../../redux/music-reducer";
import { getFilter } from "../../redux/music-selectors";

type PropsType = {
    onSerchChange: (filter: FilterType) => void
};
type FormType = {
    term: string,
    isFriend: string | null
}

export const MusicForm:FC<PropsType> = ({onSerchChange}) => {
        const filter = useAppSelector(getFilter)

    const {register, handleSubmit, reset, formState: {errors}} = useForm<FormType>();

    useEffect(() => {
        reset({
            term: filter.term,
            isFriend: String(filter.friend)
        })
    }, [filter])

    const submit:SubmitHandler<FormType> = (formData) => {
        let { isFriend, term } = formData;
        let friend = isFriend === 'null' ? null : isFriend === 'true' ? true : false;
        let filter = { term,  friend};
        onSerchChange(filter)
    }

    return (
        <form onSubmit={handleSubmit(submit)} className={styless.body} >
            <input {...register('term', {max: {value: 40, message: 'max 40'}})}  className={classNames(styless.term, {[styless.error]: errors.term})} />
            { errors.term &&
                <span className={styless.errorSpan}>{errors.term.message}</span>
            }

            <select {...register('isFriend')} className={styless.select}>
                <option value='null' >All</option>
                <option value='true' >Only followed</option>
                <option value='false' >Only unfollowed</option>
            </select>
            <button className={styless.button}>find</button>
        </form>
    )
}