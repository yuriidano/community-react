import { useAppSelector } from '../../../redux/redux-store';
import stylles from './PopapMessage.module.scss'
import CloseIcon from '@mui/icons-material/Close';
import userPhoto from '../../../assets/images/user.jpg'
import { PopapMessageForm } from './PopapMessageForm/PopapMessageForm';
import { ProfileType } from '../../../types/types';


type PropsType = {
    closePopap: (isActivePopap: boolean) => void,
    userProfile: ProfileType | null,
    topValue: string,
    leftValue: string
}

export const PopapMessage = ({closePopap, userProfile, topValue, leftValue}: PropsType) => {

    return (
        <div>
            <div  className={stylles.messagePopup}>
                <div className={stylles.messagePopupTop}>
                    <div className={stylles.messagePopupTitle}>Mew message</div>
                    <div onClick={() => closePopap(false)} className={stylles.messagePopupCloseIcon}><CloseIcon /></div>
                </div>
                <div className={stylles.messagePopupInfo}>
                    <div className={stylles.messagePopupAvatar}>
                        <img src={userProfile?.photos?.small ?? userPhoto} alt="avatar" />
                    </div>
                    <div className={stylles.messagePopupName}>{userProfile?.fullName}</div>
                </div>
                <div className={stylles.messagePopupMessage}>
                    <PopapMessageForm userId={userProfile?.userId} />
                </div>
            </div>
        </div>
    )
}