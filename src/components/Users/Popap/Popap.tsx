import stylles from './Popap.module.scss';
import CloseIcon from '@mui/icons-material/Close';

type PropsType = {
    closePopap: (isActivePopap: boolean) => void
}

export const Popap = ({closePopap}: PropsType) => {

    return (
        <div>
            <div className={stylles.MessagePopup}>
                <div className={stylles.MessagePopupTop}>
                    <div className={stylles.MessagePopupTitle}>Mew message</div>
                    <div onClick={() => closePopap(false)} className={stylles.MessagePopupCloseIcon}><CloseIcon /></div>
                </div>
            </div>
        </div>
    )
}