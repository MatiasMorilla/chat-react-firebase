import { useContext, useEffect, useState } from 'react';
//Components
import './logIn.css';
//FireBase
import db from '../../fireBase';
import {collection, addDoc, getDocs, query, where} from 'firebase/firestore';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/userProvider';

function LogIn() {
    const {setUser} = useContext(UserContext);
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [validData, setValidData] = useState(false);

    const handleSetName = (e) => {
        setUserName(e.target.value);
    } 

    const handleSetPassword = (e) => {
        setUserPassword(e.target.value);
    }
    

    const validateUser = async (e)=>{
        e.preventDefault();

        const usersRef = collection(db, "User");
        const q =  query(usersRef, where("name", "==", userName), where("password", "==", userPassword));
        
        const snapshoot = await getDocs(q);
        
        if(snapshoot.empty === false)
        {
            snapshoot.forEach( (doc) => {
              setUser(doc.data());
              console.log(doc.data());
            });
            
            setValidData(true)
        }
        else
        {
            console.log("Los datos son incorrectos");
            setValidData(false);
        }
    }

  return (
    <div className="logIn-container">
      {
         validData && <Navigate to={"/home"} />
      }
      <form className='form' onSubmit={validateUser}>
            <input 
                type="text" 
                className='input-name' 
                placeholder='Ingrese su nombre'
                value={userName}
                onChange={handleSetName}
            />
            <input 
                type="password" 
                className='input-password' 
                placeholder='Ingrese su contrasena' 
                value={userPassword}
                onChange={handleSetPassword}
            />
            <Link to={"/SignIn"}>
                Registrarse
            </Link>
            <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default LogIn;
