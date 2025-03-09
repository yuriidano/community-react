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

const Message = ({body, viewed, addedAt, id, senderName}: PropsType) => {
    return (
        <div className={stylles.message}>
            <div className={stylles.body}>
                <div className={stylles.name}>{senderName}</div>
                <div className={stylles.addedAt}>{addedAt}</div>
            </div>
            <div className={stylles.content}>
                <div className={stylles.messageText}>{body}</div>
                <div className={stylles.menu}><LongMenu id={id} /></div>
                <div>{viewed ? <DoneAllIcon className={stylles.mark} /> : <CheckIcon className={stylles.mark} />}</div>
            </div>
        </div>
    )
};



export default Message;




