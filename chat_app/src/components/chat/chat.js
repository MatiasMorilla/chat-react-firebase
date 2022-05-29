import './chat.css';
// Router
import { useParams } from 'react-router';
import HeaderApp from '../headerApp/headerApp';
// MUI
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useContext, useEffect, useState } from 'react';
// Firebase
import { doc, collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import db from '../../fireBase';
// Context
import UserContext from '../context/userProvider';
import { getDatabase, onValue, ref } from 'firebase/database';

const Chat = () => {
    const {friendName} = useParams();
    const {user, getUserFriend} = useContext(UserContext);
    const userFriend = getUserFriend(friendName);
    const [chat, setChat] = useState({id: "", users: [], messagesList: []})
    const [messagesList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");

    // Obtenemos la referencia del chat
    // Y comprobamos que sea el chat de los dos usuarios seleccionados
    const getChat = async () => {
        let chatsRef = collection(db, "Chats"); 
        let q = query(chatsRef, where("users", "array-contains", user.id)); 
        let snapshoot = await getDocs(q);
        snapshoot.forEach( (doc) => {
            if(doc.data().users.includes(userFriend.id))
            {
                setChat(doc.data());
                getChatRT();
            }
        });
    }

    const getChatRT =  () => {
        let databaseRT = getDatabase();
        let chatRef = ref(databaseRT, "messages/" + chat.id);
        onValue(chatRef, (snapshot) => {
            let data = snapshot.val();
            setMessageList(data);
        });
    }

    // Actualiza cada mensaje en la bd
    const updateChatFirebase = async () => {
        let chatsRef = collection(db, "Chats");
        let q = query(chatsRef, where("users", "array-contains", user.id));
        let snapshoot = await getDocs(q);
        snapshoot.forEach( (document) => {
            if(document.data().users.includes(userFriend.id))
            {
                let chatRef = doc(db, "Chats", document.id);
                updateDoc(chatRef, {messagesList: chat.messagesList}); 
            }
        });
    }

    // Crea un nuevo mensaje, setea la variable de estado chat con la nueva informacion y actualiza la bd
    const handleOnSubmit = (e) => {
        e.preventDefault();
        let list = chat.messagesList;
        let newMessage = {
            id: chat.messagesList.length,
            text: message,
            userId: user.id
        }

        list.push(newMessage);
        setChat({users: [chat.users[0], chat.users[1]], messagesList: list});
        setMessage("");
        updateChatFirebase();
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }

    useEffect( () => {
        getChat();
        console.log(chat);
        console.log("meassa", messagesList);
    }, []); 

    return (
        <div className='chat-container'>
            <HeaderApp arrow_path={"/home"} title={friendName} />
            <div className='chat'>
                <ul>
                    {
                        chat.messagesList.map( (message, index) => {
                            return(
                                <div 
                                    className={`li-container ${message.userId === user.id ? "rigth" : ""}`} 
                                    key={index} 
                                >
                                    <li className={`message ${message.userId === user.id ? "rigth" : "left"}`}>
                                        {message.message}
                                    </li>
                                </div>
                            );
                        })
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
