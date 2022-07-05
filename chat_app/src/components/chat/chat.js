import './chat.css';
// Router
import { useParams } from 'react-router';
import HeaderApp from '../headerApp/headerApp';
import { useContext, useEffect, useRef, useState } from 'react';
// MUI
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// Firebase
import { doc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../../fireBase';
import { getDatabase, onValue, ref, update } from 'firebase/database';
// Context
import UserContext from '../context/userProvider';
// ScroolFeed
import SrcollFedd from 'react-scrollable-feed';



const Chat = ({friendNameDesktop = null}) => {
    const {friendName} = useParams();
    const {user, getUserFriend} = useContext(UserContext);
    // Cuando el usuario esta en desktop el chat que se abre va a ser el primero de la lista y se envia or parametro
    const userFriend = friendName === undefined ? friendNameDesktop : getUserFriend(friendName); 
    const [chat, setChat] = useState({id: "", users: [], messagesList: []})
    const [messagesListRT, setMessageListRT] = useState([]);
    const [message, setMessage] = useState("");
    const databaseRT = getDatabase();
    const [forceScroll, setForceScroll] = useState(false);

    // Obtenemos la referencia del chat
    // Y comprobamos que sea el chat de los dos usuarios seleccionados
    const getChat = async () => {
        let chatsRef = collection(db, "Chats"); 
        let q = query(chatsRef, where("users", "array-contains", user.id)); 
        let snapshoot = await getDocs(q);
        snapshoot.forEach( (doc) => {
            if(doc.data().users.includes(userFriend.id))
            {
                setChat({id: doc.data().id, users: doc.data().users, messagesList: doc.data().messagesList});
                getChatRT(doc.data().id);
            }
        });
    }

    const getChatRT = (chatId) => {
        let chatRef = ref(databaseRT, "messages/" + chatId);
        onValue(chatRef, (snapshot) => {
            let data = snapshot.val();
            setMessageListRT(data);
        });
    }

    // Actualiza cada mensaje en la bd
    const updateChatFirebase = () => {
        let lastMessage = chat.messagesList[chat.messagesList.length - 1];
        let chatRef = doc(db, "Chats", chat.id);
        updateDoc(chatRef, {messagesList: chat.messagesList}); 
        update(ref(databaseRT, "messages/" + chat.id), {messagesList: chat.messagesList});
        update(ref(databaseRT, "chats/" + chat.id), {userId: lastMessage.userId, lastMessage: lastMessage.text, timestamp: lastMessage.timestamp});
    }

    // Crea un nuevo mensaje, setea la variable de estado chat con la nueva informacion y actualiza la bd
    const handleOnSubmit = (e) => {
        e.preventDefault();
        let list = chat.messagesList;
        let date = new Date();
        let newMessage = {
            id: chat.messagesList.length,
            text: message,
            userId: user.id,
            timestamp: date.toString()
        }
        
        list.push(newMessage);
        setChat({id: chat.id, users: [chat.users[0], chat.users[1]], messagesList: list});
        updateChatFirebase();
        setMessage("");
        setForceScroll(true)
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const getHours = (timestamp) => {
        let date = new Date(timestamp);
        return `${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}`;
    }

    useEffect( () => {
        getChat();
    }, [message, userFriend]); 


    return (
        <div className='chat-container'>
            <HeaderApp arrow_path={"/home"} title={userFriend !== null ? userFriend.name : "Agrega a un amigo para chatear!" } />
            <div className='chat'> 
                <SrcollFedd forceScroll={forceScroll && setTimeout(() => setForceScroll(false), 500)}>
                    <ul>
                        {
                            messagesListRT !==  null ?
                            (

                                messagesListRT.messagesList !== undefined &&
                                (
                                    messagesListRT.messagesList.map( (message, index) => {
                                        return(
                                            <div 
                                                className={`li-container ${message.userId === user.id ? "rigth" : ""}`} 
                                                key={index} 
                                            >
                                                <li className={`message ${message.userId === user.id ? "rigth" : "left"}`}>
                                                    {message.text}
                                                    <span className='message-hour'>{getHours(message.timestamp)}</span>
                                                </li>
                                            </div>
                                        );
                                    })
                                )
                            )
                            :
                            (
                                chat.messagesList.map( (message, index) => {
                                    return(
                                        <div 
                                            className={`li-container ${message.userId === user.id ? "rigth" : ""}`} 
                                            key={index}
                                        >
                                            <li className={`message ${message.userId === user.id ? "rigth" : "left"}`}>
                                                {message.text}
                                                <span className='message-hour'>{message.timestamp}</span>
                                            </li>
                                        </div>
                                    );
                                })
                            )
                        }
                    </ul>
                </SrcollFedd>
            </div>
            <form className='chat-form' onSubmit={handleOnSubmit}>
                <input 
                    type="text" 
                    placeholder='Escribe un mensaje aqui'
                    value={message}
                    onChange={handleMessage}
                    autoFocus={true}
                    disabled={userFriend === null && true}
                />
                <Button 
                    type='submit'
                    disabled={message === "" ? true : false}
                >
                    <SendIcon />
                </Button>
            </form>
            
        </div>
        
    );
}

export default Chat;
