import userPhoto from '../../../assets/images/user.jpg'
import { requestMessages } from '../../../redux/dialogs-reducer'
import { useAppDispatch } from '../../../redux/redux-store'
import stylles from './Dialog.module.scss'

type PropsType = {
    id: number,
    userName: string,
    hasNewMessages: boolean,
    lastDialogActivityDate: string,
    lastUserActivityDate: string,
    newMessagesCount: number,
    photos: {small: string, large: string}
}


export const Dialog = (props: PropsType) => {
    const dispatch = useAppDispatch();

    const onMessagesHandler = (userId: number) => {
        dispatch(requestMessages(userId))
    }


    return (
        <div onClick={() => onMessagesHandler(props.id)} className={stylles.dialog}>
            <div className={stylles.avatar}>
                <img src={props.photos.small ?? userPhoto} alt="avatar" />
            </div>
            <div className={stylles.name}>{props.userName}</div>
    
        </div>
    )
}