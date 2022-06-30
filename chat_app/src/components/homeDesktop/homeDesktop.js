import './homeDesktop.css';
import { useContext, useEffect, useState } from "react";
// CONTEXT
import UserContext from "../context/userProvider";
// COMPONENTS
import HeaderApp from '../headerApp/headerApp';
import ItemFriend from '../itemFriend/itemFriend';
import Chat from '../chat/chat';
// MUI
import { InputBase } from '@mui/material';
import { Navigate } from 'react-router';

const HomeDesktop = () => {
  const {user, deleteFriend, setValidDataLI} = useContext(UserContext);
  const [userFriend, setUserFriend] = useState(user.friendsList[0]);
  const [searchValue, setSearchValue] = useState("");
  const [friendsList, setFriendsList] = useState([]);

  const handleSearch = (e) => {
      setSearchValue(e.target.value);
  }

  const handleResertValidDataLI = () => {
    setValidDataLI(false)
  }
  
  const filterFriends = (userFriendsList) => {

    if(searchValue === "")
    {
        setFriendsList(userFriendsList)
    }
    else
    {
      setFriendsList(userFriendsList.filter( person => person.name.toLowerCase().includes(searchValue.toLowerCase()))) ;
    }
  }

  useEffect( () => {
      handleResertValidDataLI()
      filterFriends(user.friendsList)
  }, [searchValue]);

  return (
    <div className="homeDesktop-container">
        <HeaderApp arrow_path="/" title="Chats" className="homeDesktop-headerChats"/>
        <div className="search-container">
            <InputBase
                className="search-input"
                placeholder="Buscar por nombre..."
                value={searchValue}
                onChange={handleSearch}
              />
        </div>
        <div className='homeDesktop-friends'>
            {
                friendsList.map( (friend) => {
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
