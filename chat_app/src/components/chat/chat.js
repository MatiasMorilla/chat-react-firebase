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

const Chat = () => {
    const {friendName} = useParams();
    const {user, getUserFriend} = useContext(UserContext);
    const userFriend = getUserFriend(friendName);
    const [chat, setChat] = useState({idUser1: "", idUser2: "", messagesList: []})
    const [message, setMessage] = useState("");

    const getChat = async () => {
        let chatsRef = collection(db, "Chats");
        let q = query(chatsRef, where("idUser1", "==", user.id), where("idUser2", "==", userFriend.id));
        let snapshoot = await getDocs(q);
        snapshoot.forEach( (doc) => {
            setChat(doc.data());
        });
    }

    const updateChatFirebase = async () => {
        let chatsRef = collection(db, "Chats");
        let q = query(chatsRef, where("idUser1", "==", user.id), where("idUser2", "==", userFriend.id));
        let snapshoot = await getDocs(q);
        snapshoot.forEach( (document) => {
            let chatRef = doc(db, "Chats", document.id);
            updateDoc(chatRef, {messagesList: chat.messagesList}); 
        });
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        let list = chat.messagesList;
        let newMessage = {
            id: chat.messagesList.length,
            text: message
        }

        list.push(newMessage);
        setChat({idUser1: chat.idUser1, isUser2: chat.idUser2, messagesList: list});
        setMessage("");
        updateChatFirebase();
    }

    const handleMessage = (e) => {
        setMessage(e.target.value);
    }


    

    useEffect( () => {
        getChat();
        console.log(chat);
    }, []); 

    return (
        <div className='chat-container'>
            <HeaderApp arrow_path={"/home"} title={friendName} />
            <div className='chat'>
                <ul>
                    {
                        chat.messagesList.map( (message) => {
                            return(
                                <li key={message.id}>{message.text}</li>
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
