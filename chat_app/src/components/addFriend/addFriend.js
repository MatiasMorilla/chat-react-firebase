import './addFriend.css';
import { useContext, useEffect, useState } from 'react';
// Components
import HeaderApp from '../headerApp/headerApp';
import PersonsList from '../personList/personsList';
// MUI 
import InputBase from '@mui/material/InputBase';
// CONTEXT
import UserContext from '../context/userProvider';



const AddFriend = () => {
    const {getUsersWithoutAUF} = useContext(UserContext);
    const [searchValue, setSearchValue] = useState("");
    const [usersList, setUsersList] = useState([]);

    const handleSearch = (e) => {
        setSearchValue(e.target.value);
    }

    useEffect( () => {
        getUsersWithoutAUF().then( (data) => {
            if(searchValue === "")
            {
                setUsersList(data);
            }
            else
            {
                setUsersList(data.filter( person => person.name.toLowerCase().includes(searchValue.toLowerCase())));
            }
        });
        
    },[searchValue]);

  return (
    <div className="persons-container">
        <HeaderApp arrow_path="/home" title="Agregar amigos"/>
        <div className="search-container">
            <InputBase
                className="search-input"
                placeholder="Buscar por nombre..."
                value={searchValue}
                onChange={handleSearch}
              />
        </div>
        <PersonsList usersList={usersList}/>
    </div>
  );
}

export default AddFriend;
