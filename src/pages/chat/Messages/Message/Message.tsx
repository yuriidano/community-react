import React from "react";
import classNames from "classnames";
import stylles from './Message.module.scss'
import { useAppSelector } from "../../../../redux/redux-store";

type MessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
  }
  
  
  export const Message = React.memo(({message, photo, userName, userId}: MessageType) => {

    let ovner = useAppSelector((state) => state.auth.userId);
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
  