import React from 'react';
import styles from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import DialogsReduxForm from './DialogsForm';




const Dialogs = (props) => { 
    let state = props.state;

    let dialogsElement = state.dialods.map( d => <DialogItem name={d.name} id={d.id} icon={d.url} key={d.id} />); 


    let sendMessage = (formData) => {
        props.sendMessage(formData.message);
    };




    return (
        <div className={styles.dialogs}>
            <div className={styles.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={styles.body}>
                <div className={styles.messages}>
                    {state.messages.map((m) => <span className={styles.message}><Message message={m.message} key={m.id} /></span>)}
                </div>
                <div className={styles.formElements}>
                    <DialogsReduxForm onSubmit={sendMessage} />
                </div>
            </div>
        </div>
    );
};

export default Dialogs;




