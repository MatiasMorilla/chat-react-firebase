import './home.css';
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userProvider";
import HeaderApp from '../headerApp/headerApp';
import ItemFriend from '../itemFriend/itemFriend';
import { Link } from 'react-router-dom';
import { InputBase } from '@mui/material';


const Home = () => {
    const {user, deleteFriend, setValidDataLI} = useContext(UserContext);
    const [searchValue, setSearchValue] = useState("");
    const [usersList, setUsersList] = useState(user.friendsList);
    console.log(usersList)

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    const handleResertValidDataLI = () => {
      setValidDataLI(false)
    }
    
    useEffect( () => {
      handleResertValidDataLI()
      if(searchValue === "")
      {
          setUsersList(user.friendList);
      }
      else
      {
          setUsersList(user.friendList.filter( person => person.name.toLowerCase().includes(searchValue.toLowerCase())));
      }

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
              user.friendsList.map( (friend) => {
                return(
                  <Link 
                    to={`/chat/${friend.name}`}
                    key={friend.id} 
                    className="home-link"
                  >
                      <ItemFriend  className={"home-itemFriend"} name={friend.name} deleteFriend={deleteFriend}/>
                  </Link>
                );
              })
          }
      </div>
    );
}

export default Home;
