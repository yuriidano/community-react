import styles from './Dialogs.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { useEffect, useRef, useState } from 'react';
import { requestDialogs } from '../../redux/dialogs-reducer';
import { Dialog } from './Dialog/Dialog';
import Message from './Message/Message';
import { DialogsForm } from './DialogsForm/DialogsForm';
import { profileMount } from '../../redux/profile-reducer';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import classNames from 'classnames';




const DialogsPage = () => { 
    const dispatch = useAppDispatch();
    const dialogs = useAppSelector(state => state.dialogsPage.dialods);
    const messages = useAppSelector(state => state.dialogsPage.messages);
    const currentDialogId = useAppSelector(state => state.dialogsPage.currentDialogId);


    useEffect(() => {
        dispatch(requestDialogs())

        dispatch(profileMount(true));
        return () => {
            dispatch(profileMount(false));
        }
    }, []);


    const containerRef = useRef<HTMLDivElement>(null);
    const [isScrollActive, setIsScrollActive] = useState(true);


    const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;

        if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 30) {
            !isScrollActive && setIsScrollActive(true)
        } else {
            isScrollActive && setIsScrollActive(false)
        }
    };

    const bottomHandler = () => {
        setIsScrollActive(true)
    }


    useEffect(() => {
        if (containerRef.current && isScrollActive) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages, isScrollActive]);




    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogs.map(d => {
                    return (
                        <div className={classNames(styles.dialogsItem, {[styles.dialogsItemActive]: d.id === currentDialogId})}><Dialog {...d} /></div>
                    )
                })}
            </div>
            <div className={styles.body}>
                <div className={styles.messages}  >
                <div className={styles.messagesItemsBody}>
                <div ref={containerRef} onScroll={scrollHandler} className={styles.messagesItems}>
                        {messages.map(m => <Message {...m} />)}
                    </div>
                </div>
                    <div className={styles.form}>
                        { currentDialogId &&
                            <DialogsForm />
                        }
                        <div onClick={bottomHandler} className={classNames(styles.bottomBody, { [styles.bottomBodyHiden]: isScrollActive })}>
                            <ArrowDownwardIcon className={styles.arrowBottom} />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export const DialogsWithRedirect = withAuthRedirect(DialogsPage);




