import { FC } from 'react';
import styles from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import DialogsReduxForm from './DialogsForm';
import { useAppDispatch, useAppSelector } from '../../redux/redux-store';
import { sendMessage } from '../../redux/dialogs-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';

type PropsDialogsType = {};

export type FormDataType = {
    message: string 
}

const DialogsPage: FC<PropsDialogsType> = (props) => { 
    const dispatch = useAppDispatch();
    const dialods = useAppSelector((state) => state.dialogsPage.dialods);
    const messages = useAppSelector((state) => state.dialogsPage.messages);


    let dialogsElement = dialods.map( d => <DialogItem name={d.name} id={d.id} icon={d.url} key={d.id} />); 


    let submit = (formData: FormDataType) => {
        dispatch(sendMessage(formData.message))
    };


    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={styles.body}>
                <div className={styles.messages}>
                    {messages.map((m) => <span className={styles.message}><Message message={m.message} key={m.id} /></span>)}
                </div>
                <div className={styles.formElements}>
                    <DialogsReduxForm onSubmit={submit} />
                </div>
            </div>
        </div>
    );
};

export const DialogsWithRedirect = withAuthRedirect(DialogsPage);




