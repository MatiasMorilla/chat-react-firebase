import './personsList.css';
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userProvider";
// Components
import HeaderApp from '../headerApp/headerApp';
import ItemFriend from '../itemFriend/itemFriend';



const PersonsList = () => {
    const {user, addFriend, getUsersWithoutFriends, userList} = useContext(UserContext);

    useEffect( () => {
        getUsersWithoutFriends();
    }, []);

    console.log(user.friendsList);
    console.log(user.name);
  return (
    <div className="persons-container">
        <HeaderApp arrow_path="/home" title="Agregar amigos"/>
        <div className='users'>
            {
              userList.map( (value, index) =>{
                  return(
                      <ItemFriend key={index} name={value.name} addFriend={addFriend}/>
                  )
              })
            }
        </div>  
    </div>
  );
}

export default PersonsList;
