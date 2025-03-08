import styles from './Dialogs.module.scss';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { useEffect } from 'react';
import { requestDialogs } from '../../redux/dialogs-reducer';
import { Dialog } from './Dialog/Dialog';
import Message from './Message/Message';
import { DialogsForm } from './DialogsForm/DialogsForm';




const DialogsPage = () => { 
    const dispatch = useAppDispatch();
    const dialogs = useAppSelector(state => state.dialogsPage.dialods);
    const messages = useAppSelector(state => state.dialogsPage.messages);
    const currentDialogId = useAppSelector(state => state.dialogsPage.currentDialogId)
    
   
    useEffect(() => {
        dispatch(requestDialogs())
    }, [])




    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {
                    dialogs.map(d => <Dialog {...d} />)
                }
            </div>
            <div className={styles.body}>
                <div className={styles.messages}>
                    <div className={styles.messagesItems}>
                        {
                            messages.map(m => <Message {...m} />)
                        }
                    </div>
                    <div>
                        { currentDialogId &&
                            <DialogsForm />
                        }
                    </div>
                </div>

            </div>
        </div>
    );
};

export const DialogsWithRedirect = withAuthRedirect(DialogsPage);




