import stylles from './Chat.module.scss'
import { ChatForm } from './ChatForm/ChatForm';
import { Messages } from './Messages/Messages';


const ChatPage = () => {

  return <Chat />
};


const Chat = () => {

  return (
    <div className={stylles.chat}>
      <Messages />
      <ChatForm />
    </div>
  )
}





export default ChatPage;

