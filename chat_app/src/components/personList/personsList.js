import './personsList.css';
import { useContext, useEffect } from "react";
import UserContext from "../context/userProvider";
// Components
import ItemFriend from '../itemFriend/itemFriend';


const PersonsList = ({usersList}) => {
    const {addFriend} = useContext(UserContext);
    
    return (
      <div className="persons-container">
          <div className='users'>
              {
                usersList.map( (value, index) =>{
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
