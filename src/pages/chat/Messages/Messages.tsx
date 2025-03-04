import React, { useEffect, useRef, useState } from "react";
import stylles from './Messahes.module.scss'
import classNames from "classnames";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { useAppDispatch, useAppSelector } from "../../../redux/redux-store";
import { startMessagesListining } from "../../../redux/chat-reducer";
import { Message } from "./Message/Message";


export const Messages = () => {
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
  };

  const bottomHandler = () => {
    setIsScrollActive(true)
  }
  
  useEffect(() => {
    dispatch(startMessagesListining())
  }, []);


  useEffect(() => {
    if(containerRef.current && isScrollActive) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isScrollActive]);

  return (
    <div className={stylles.messages} ref={containerRef} onScroll={scrollHandler} >
      <div onClick={bottomHandler} className={classNames(stylles.bottomBody, { [stylles.bottomBodyHiden]: isScrollActive })}>
        <ArrowDownwardIcon className={stylles.arrowBottom} />
      </div>
      {
        messages.map(m => <Message {...m} />)
      }
    </div>
  )
};


