import './personsList.css';
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userProvider";
// Components
import HeaderApp from '../headerApp/headerApp';
import ItemFriend from '../itemFriend/itemFriend';



const PersonsList = () => {
    const {user, addFriend, getUsersWithoutAUF, userList} = useContext(UserContext);

    useEffect( () => {
      getUsersWithoutAUF();
    }, []);


  return (
    <div className="persons-container">
        <HeaderApp arrow_path="/home" title="Agregar amigos"/>
        <div className='users'>
            {
              userList.map( (value, index) =>{
                  return(
                      <ItemFriend key={index} name={value.name} addFriend={addFriend} addOrdelete="add"/>
                  )
              })
            }
        </div>  
    </div>
  );
}

export default PersonsList;
