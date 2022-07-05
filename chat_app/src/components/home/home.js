import './home.css';
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userProvider";
import HeaderApp from '../headerApp/headerApp';
import ItemFriend from '../itemFriend/itemFriend';
import { Link, Navigate } from 'react-router-dom';
import { InputBase } from '@mui/material';


const Home = () => {
    const {user, deleteFriend, setValidDataLI} = useContext(UserContext);
    const [searchValue, setSearchValue] = useState("");
    const [friendsList, setFriendsList] = useState([]);
    const [arrayFriends, setaArayFriends] = useState([]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const handleResertValidDataLI = () => {
      setValidDataLI(false)
    }

    const filterFriends = (userFriendsList) => {

        if(searchValue.length === 0 )
        {
            setFriendsList(userFriendsList)
        }
        else
        {
          setFriendsList(userFriendsList.filter( person => person.name.toLowerCase().includes(searchValue.toLowerCase()))) ;
        }
    }

    const getMostRecentChat = (friendName, timestamp) => {
        friendsList.forEach( (friend, index) => 
        {
            if(friend.name == friendName)
            {
              friendsList[index].timestamp = new Date(timestamp);
            }  
        }); 

        friendsList.sort( (a, b) => b.timestamp - a.timestamp);
    }
    
    useEffect( () => {
        handleResertValidDataLI();
        filterFriends(user.friendsList);
    }, [searchValue]);

    return (
      <div className="home-container">
          <HeaderApp arrow_path="/" title="Chats" />
          <div className="search-container">
              <InputBase
                  className="search-input"
                  placeholder="Buscar por nombre..."
                  value={searchValue}
                  onChange={handleSearch}
                />
          </div>
          {
              friendsList.map( (friend) => {
                return(
                  <Link 
                    to={`/chat/${friend.name}`}
                    key={friend.id} 
                    className="home-link"
                  >
                      <ItemFriend  
                        className={"home-itemFriend"} 
                        name={friend.name} 
                        deleteFriend={deleteFriend}
                        getMostRecentChat={getMostRecentChat}
                      />
                  </Link>
                );
              })
          }
      </div>
    );
}

export default Home;
