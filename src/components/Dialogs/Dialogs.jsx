import React from 'react';
import s from './Dialogs.module.scss';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Navigate } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import DialogsReduxForm from './DialogsForm';




const Dialogs = (props) => { 
    let state = props.state;

    let dialogsElement = state.dialods.map( d => <DialogItem name={d.name} id={d.id} icon={d.url} key={d.id} />); 
    let messageElement = state.messages.map((m) => <Message message={m. message} key={m.id} />);


    let sendMessage = (formData) => {
        props.sendMessage(formData.message);
    };




    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElement}
            </div>
            <div className={s.messages}>
                {messageElement}
                <div className={s.newMessage}>
                    <DialogsReduxForm onSubmit={sendMessage} />
                </div>
            </div>
        </div>
    );
};

export default Dialogs;




