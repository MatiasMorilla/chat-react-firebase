import './chat.css';
// Router
import { useParams } from 'react-router';
import HeaderApp from '../headerApp/headerApp';
// MUI
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useContext, useEffect, useState } from 'react';
// Firebase
import { doc, collection, getDocs, query, updateDoc, where, Timestamp } from 'firebase/firestore';
import db from '../../fireBase';
import { getDatabase, onValue, ref, update, set } from 'firebase/database';
// Context
import UserContext from '../context/userProvider';

const Chat = () => {
    const {friendName} = useParams();
    const {user, getUserFriend} = useContext(UserContext);
    const userFriend = getUserFriend(friendName);
    const [chat, setChat] = useState({id: "", users: [], messagesList: []})
    const [messagesListRT, setMessageListRT] = useState([]);
    const [message, setMessage] = useState("");
    const databaseRT = getDatabase();

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
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const getHours = (timestamp) => {
        let date = new Date(timestamp);
        return date.getHours() + ":" + date.getMinutes();
    }

    useEffect( () => {
        getChat();
        console.log("ca")
    }, [message]); 

    return (
        <div className='chat-container'>
            <HeaderApp arrow_path={"/home"} title={friendName} />
            <div className='chat'>
                <ul>
                    {
                        messagesListRT !=  null ?
                        (

                            messagesListRT.messagesList != undefined &&
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
            </div>
            <form className='chat-form' onSubmit={handleOnSubmit}>
                <input 
                    type="text" 
                    placeholder='Escribe un mensaje aqui'
                    value={message}
                    onChange={handleMessage}
                />
                <Button type='submit'>
                    <SendIcon />
                </Button>
            </form>
            
        </div>
        
    );
}

export default Chat;
