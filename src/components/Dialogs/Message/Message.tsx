import { FC } from 'react';
import s from './../Dialogs.module.scss';

type PropsType = {
    message: string
}

const Message: FC<PropsType> = ({message}) => {
    return  <div className={s.message}>{message}</div>
};



export default Message;




