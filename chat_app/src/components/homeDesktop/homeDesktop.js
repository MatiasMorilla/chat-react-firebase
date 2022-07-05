import './homeDesktop.css';
import { useContext, useEffect, useReducer, useState } from "react";
// CONTEXT
import UserContext from "../context/userProvider";
// COMPONENTS
import HeaderApp from '../headerApp/headerApp';
import ItemFriend from '../itemFriend/itemFriend';
import Chat from '../chat/chat';
// MUI
import { InputBase } from '@mui/material';

const HomeDesktop = () => {
  const {user, deleteFriend, setValidDataLI} = useContext(UserContext);
  const [userFriend, setUserFriend] = useState(user.friendsList[0]);
  const [searchValue, setSearchValue] = useState("");
  const [friendsList, setFriendsList] = useState([]);
  const [any, forceUpdate] = useReducer(num => num + 1, 0);

  const handleSearch = (e) => {
      setSearchValue(e.target.value);
  }

  const handleResertValidDataLI = () => {
    setValidDataLI(false)
  }

  function handleChange(){
    forceUpdate();
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

  // Obtiene los chats desde el itemFriend y le agrega la fecha al friendsList para despues ordenarlo por el mas reciente
  const getMostRecentChat = (friendName, timestamp) => {

    friendsList.forEach( (friend, index) => 
    {
        if(friend.name == friendName)
        {
          friendsList[index].timestamp = new Date(timestamp);
        }  
    }); 

    friendsList.sort( (a, b) => b.timestamp - a.timestamp);
    handleChange();
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
                        <ItemFriend  
                            className={"homeDesktop-itemFriend"} 
                            name={friend.name} 
                            deleteFriend={deleteFriend}
                            getMostRecentChat={getMostRecentChat}
                         />
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
