import s from './../Dialogs.module.scss';

type PropsType = {
    message: string
}

const Message = ({message}: PropsType) => {
    return  <div className={s.message}>{message}</div>
};



export default Message;




