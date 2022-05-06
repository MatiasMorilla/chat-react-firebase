import './personsList.css';
import { useContext, useEffect, useState } from "react";
import UserContext from "../context/userProvider";
// Components
import HeaderApp from '../headerApp/headerApp';
// Firebase
import { collection, getDocs } from 'firebase/firestore';
import db from '../../fireBase';
import ItemFriend from '../itemFriend/itemFriend';


const PersonsList = () => {
    const {user} = useContext(UserContext);
    const [personList, setPersonList] = useState([]);

    const getPersons = async () => {
      let snapshoot = await getDocs(collection(db, "User"));
      let arrayPersons = [];

      snapshoot.forEach( (doc) => {
          if(doc.data().name !== user.name)
          {
              arrayPersons.push(doc.data());
          }
      });

      setPersonList(arrayPersons);
    }


    useEffect( () => {
        getPersons();
    }, []);

  return (
    <div className="persons-container">
        <HeaderApp arrow_path="/home" title="Agregar amigos"/>
        <div className='users'>
            {
              personList.map( (value, index) =>{
                  return(
                      <ItemFriend key={index} name={value.name}/>
                  )
              })
            }
        </div>  
    </div>
  );
}

export default PersonsList;
