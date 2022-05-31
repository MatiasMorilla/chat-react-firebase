import './itemFriend.css';
import { useContext, useEffect, useState } from 'react';
// MUI
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
// Firestore
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getDatabase, onValue, ref } from 'firebase/database';
import db from '../../fireBase';
// Context
import UserContext from '../context/userProvider';

const ItemFriend = ({name, addFriend = null, deleteFriend = null, addOrdelete = null}) => {
    const {user, getUserFriend} = useContext(UserContext);
    const [addedFriend, setAddedFriend] = useState(false);
    const [lastMsg, setLastMsg] = useState({userId: "", lastMessage: "", timestamp: ""});

    const getFriend = () => {
        addFriend(name);
        setAddedFriend(true);
    }

    const removeFriend = () => {
        console.log("delete");
    }

    const getLastMsg = async () => {
        let userFriend = getUserFriend(name);
        let chatsRef = collection(db, "Chats"); 
        let q = query(chatsRef, where("users", "array-contains", user.id)); 
        let snapshoot = await getDocs(q);
        snapshoot.forEach( (doc) => {
            if(doc.data().users.includes(userFriend.id))
            {
                let chatRef = ref(getDatabase(), "chats/" + doc.data().id);
                onValue(chatRef, (snapshoot) => {
                    let data = snapshoot.val();
                    setLastMsg({userId: data.userId, lastMessage: data.lastMessage, timestamp: data.timestamp});
                })
            }
        });
    }

    
    useEffect( () => {
        getLastMsg();
    }, []);

    return (
        <div className={`itemFriend-container ${addedFriend ? 'added' : ''}`}>
            <div className='user-info'>
                <p className='name'>{name}</p>
                <p className='lastMsg'>
                    {user.id === lastMsg.userId ? "Tu: " : ""}
                    {lastMsg.lastMessage}
                </p>
                <p className='date'>{lastMsg.timestamp }</p>
                <Button 
                    onClick={addFriend !== null ? getFriend : removeFriend} 
                    className="itemFriend-btn" 
                >
                    {addOrdelete === 'add' ? '+' : "x"}
                </Button>
            </div>
            <Divider className='divider'/>
        </div>
    );
}

export default ItemFriend;
