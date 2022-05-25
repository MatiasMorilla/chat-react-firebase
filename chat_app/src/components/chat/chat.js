import './chat.css';
//Router
import { useParams } from 'react-router';
import HeaderApp from '../headerApp/headerApp';

const Chat = () => {
    const {friendName} = useParams();

    return (
        <div className="chat-container">
            <HeaderApp arrow_path={"/home"} title={friendName} />
        </div>
    );
}

export default Chat;
