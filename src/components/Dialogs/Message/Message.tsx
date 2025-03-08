import stylles from  './Message.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { LongMenu } from './MenuMessage/MenuMessage';


type PropsType = {
    addedAt: string,
    body: string,
    id: string,
    recipientId: number,
    senderId: number,
    senderName: string,
    translatedBody: null | string,
    viewed: boolean
}

const Message = ({body, viewed, addedAt, id}: PropsType) => {
    return (
        <div>
            <LongMenu id={id} />
            <div>{body}</div>
            <div className={stylles.body}>
            <div>{addedAt}</div>
                <div>{viewed ? <DoneAllIcon className={stylles.mark} /> : <CheckIcon className={stylles.mark} />}</div>
            </div>
        </div>
    )
};



export default Message;




