import stylles from  './Message.module.scss';
import CheckIcon from '@mui/icons-material/Check';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { LongMenu } from './MenuMessage/MenuMessage';
import { useAppSelector } from '../../../redux/redux-store';
import classNames from 'classnames';


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

const Message = ({body, viewed, addedAt, id, senderName, senderId}: PropsType) => {
     

    const newDate = addedAt.slice(0, 10); 



    let ovner = useAppSelector((state) => state.auth.userId);
    return (
        <div className={classNames(stylles.message, {[stylles.messageOvner]: ovner === senderId})}>
            <div className={classNames(stylles.info, {[stylles.infoOvner]: ovner === senderId})}>
            <div className={classNames(stylles.body, {[stylles.bodyOvner]: ovner === senderId})}>
                    <div className={classNames(stylles.name, { [stylles.nameOvner]: ovner === senderId })}>{senderName}</div>
                    <div className={stylles.addedAt}>{newDate}</div>
                </div>
                <div className={classNames(stylles.content, { [stylles.contentOvner]: ovner === senderId })}>
                    <div className={stylles.messageText}>{body}</div>
                    <div className={stylles.menu}><LongMenu id={id} /></div>
                    {viewed ?
                        <div className={classNames({ [stylles.markOvner]: ovner === senderId })}><DoneAllIcon /></div>
                        :
                        <div className={classNames(stylles.mark, { [stylles.markOvner]: ovner === senderId })}><CheckIcon /></div>
                    }
                </div>
            </div>
        </div>
    )
};


export default Message;




