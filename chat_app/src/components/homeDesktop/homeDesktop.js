import './homeDesktop.css';
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userProvider";
import HeaderApp from '../headerApp/headerApp';
import ItemFriend from '../itemFriend/itemFriend';
import { Link } from 'react-router-dom';
import Chat from '../chat/chat';

const HomeDesktop = () => {
  const {user, deleteFriend} = useContext(UserContext);
  const [userFriend, setUserFriend] = useState(user.friendsList[0]);

  return (
    <div className="homeDesktop-container">
        <HeaderApp arrow_path="/" title="Chats" className="homeDesktop-headerChats"/>
        <div className='homeDesktop-friends'>
            {
                user.friendsList.map( (friend) => {
                return(
                    <a 
                        onClick={() => setUserFriend(friend)}
                        key={friend.id} 
                        className="homeDesktop-link"
                    >
                        <ItemFriend  className={"homeDesktop-itemFriend"} name={friend.name} deleteFriend={deleteFriend}/>
                    </a>
                );
                })
            }
        </div>
        <Chat 
            className="homeDesktop-chat"
            friendNameDesktop={userFriend}
        />
    </div>
  );
}

export default HomeDesktop;
