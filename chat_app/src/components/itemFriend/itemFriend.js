import './itemFriend.css';
import { useContext, useEffect, useState } from 'react';
// MUI
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
// Firestore
import { collection, getDocs, query, where } from 'firebase/firestore';
import { get, getDatabase, onValue, ref } from 'firebase/database';
import db from '../../fireBase';
// Context
import UserContext from '../context/userProvider';

const ItemFriend = ({name, addFriend = null, deleteFriend = null, addOrdelete = null, getMostRecentChat = null}) => {
    const {user, getUserFriend} = useContext(UserContext);
    const [addedFriend, setAddedFriend] = useState(false);
    const [deletedFriend, setDeletedFriend] = useState(false);
    const [lastMsg, setLastMsg] = useState({userId: "", lastMessage: "", timestamp: ""});
    const userFriend = getUserFriend(name);

    const getFriend = () => {
        addFriend(name);
        setAddedFriend(true);
    }

    const removeFriend = (e) => {
        e.preventDefault();
        deleteFriend(userFriend);
        setDeletedFriend(true);
    }

    const getLastMsg = async () => {
        let chatsRef = collection(db, "Chats"); 
        let q = query(chatsRef, where("users", "array-contains", user.id)); 
        let snapshoot = await getDocs(q);
        snapshoot.forEach( (doc) => {
            if(doc.data().users.includes(userFriend.id))
            {
                let chatRef = ref(getDatabase(), "chats/" + doc.data().id);
                onValue(chatRef, (snapshoot) => {
                    if(snapshoot.size !== 0)
                    {
                        let data = snapshoot.val();
                        setLastMsg({userId: data.userId, lastMessage: data.lastMessage, timestamp: data.timestamp});
                        getMostRecentChat(userFriend.name, data.timestamp);
                    }
                    else
                    {
                        setLastMsg({userId: "", lastMessage: "", timestamp: ""});
                        getMostRecentChat(userFriend.name, "-1");
                    }
                    
                })
            }
        });
    }

    const getMessageTime = (timestamp) => {
        let date = new Date(timestamp);
        let todayDate = new Date();
        let timeText = "";

        if(date.getDate() === todayDate.getDate() && date.getMonth() === todayDate.getMonth())
            timeText =`${date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes()}`;
        else if(date.getDate() === todayDate.getDate() -1 && date.getMonth() === todayDate.getMonth())
            timeText = "Ayer";
        else if(date.getDate() < todayDate.getDate() - 1  && date.getDate() > todayDate.getDate() - 7 && date.getMonth() === todayDate.getMonth() )
                timeText = getWeekDay(date.getDay());
        else if(date.getTime() < todayDate.getTime())
            timeText = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    
        return timeText;
    }

    const getWeekDay = (number) => {
        let weekDay = "";

        if(number === 0)
            weekDay = "Domingo";
        else if (number === 1)
            weekDay = "Lunes";
        else if (number === 2)
            weekDay = "Martes";
        else if (number === 3)
            weekDay = "Miercoles";
        else if (number === 4)
            weekDay = "Jueves";
        else if (number === 5)
            weekDay = "Viernes";
        else if (number === 6)
            weekDay = "Sabado";

        return weekDay;    
    }
    
    useEffect( () => {
        getLastMsg();      
    }, []);

    return (
        <div className={`itemFriend-container ${addedFriend ? 'added' : ''} ${deletedFriend ? 'deleted' : ''}`}>
            <div className={`user-info ${lastMsg.userId == "" ? 'addFriend' : ''}`}>
                <p className='name'>{name}</p>
                <p className='lastMsg'>
                    {user.id === lastMsg.userId ? "Tu: " : ""}
                    {lastMsg.lastMessage}
                </p>
                <p className='date'>{getMessageTime(lastMsg.timestamp)}</p>
                <Button 
                    onClick={addFriend !== null ? getFriend : removeFriend} 
                    className={`itemFriend-btn ${addFriend !== null ? "green" : "grey"} `}
                    variant="contained"
                >
                    {addOrdelete === 'add' ? <AddIcon /> : <DeleteIcon />}
                </Button>
            </div>
            <Divider className='divider'/>
        </div>
    );
}

export default ItemFriend;
