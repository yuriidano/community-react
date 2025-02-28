import { SubmitHandler, useForm } from "react-hook-form";
import stylles from './Chat.module.scss'
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "../../redux/redux-store";
import React, { useEffect, useRef, useState } from "react";
import { sendMessage, startMessagesListining } from "../../redux/chat-reducer";

 const ChatPage = () => {


  return <><Chat /></>
};


const Chat = () => {

  return (
    <div className={stylles.chat}>
       <Messages />
       <ChatForm />
    </div>
  )
}


const Messages = () => {
  const dispatch = useAppDispatch();
  const messages = useAppSelector(state => state.chat.messages);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrollActive, setIsScrollActive] = useState(true);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;

    if(Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 30) {
       !isScrollActive && setIsScrollActive(true)
    } else {
      isScrollActive && setIsScrollActive(false)
    }
  }
  
  useEffect(() => {
    dispatch(startMessagesListining())
  }, []);

  useEffect(() => {
    if(containerRef.current && isScrollActive) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages])

  return (
    <div className={stylles.messages} ref={containerRef} onScroll={scrollHandler} >
      {
        messages.map(m => <Message {...m} />)
      }
    </div>
  )
}

type MessageType = {
  message: string,
  photo: string,
  userId: number,
  userName: string
}


const Message = React.memo(({message, photo, userName, userId}: MessageType) => {
  let ovner = useAppSelector((state) => state.auth.userId);
  console.log(ovner);
  return (
    <div className={classNames(stylles.message, {[stylles.messageOvner]: ovner === userId})}>
      <div className={stylles.avatar}>
        <img src={photo} alt="avatar" />
      </div>
      <div className={classNames(stylles.body, {[stylles.bodyOvner]: ovner === userId})}>
      <div className={classNames(stylles.name, {[stylles.nameOvner]: ovner === userId})}>{userName}</div>
        <div className={stylles.messageText}>{message}</div>
      </div>
    </div>
  )
});






type FormData = {
    message: string
}

const ChatForm= () => {
  const dispatch = useAppDispatch();

  const {register, handleSubmit, reset, formState: {errors}} = useForm<FormData>();

  const submit:SubmitHandler<FormData> = (formData) => {
    const {message} = formData;
    dispatch(sendMessage(message))
    reset({message: ''})
  }

  return (
    <>  
        <form onSubmit={handleSubmit(submit)}>
            <div>
            <textarea {...register('message', {required: 'field is required'})} className={classNames(stylles.messageArea, {[stylles.error]: errors.message})} 
            ></textarea>
            </div>
            { errors.message && 
              <span className={stylles.errorSpan}>{errors.message.message}</span>
            }
            <button className={stylles.button}>find</button>
        </form>
    </>
  )
}


export default ChatPage;

