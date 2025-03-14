import stylles from './Chat.module.scss'
import { ChatForm } from './ChatForm/ChatForm';
import { Messages } from './Messages/Messages';


const ChatPage = () => {

  return <Chat />
};


const Chat = () => {

  return (
    <div className={stylles.chat}>
      <div className={stylles.messages}>
          <div><Messages /></div>
      </div>
      <div className={stylles.chatForm}><ChatForm /></div>
    </div>
  )
}





export default ChatPage;

