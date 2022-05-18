import { useContext, useEffect, useState } from 'react';
//Components
import './logIn.css';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/userProvider';

function LogIn() {
    const {validateUser, validDataLI} = useContext(UserContext);
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");


    const handleSetName = (e) => {
        setUserName(e.target.value);
    } 

    const handleSetPassword = (e) => {
        setUserPassword(e.target.value);
    }
    

    const handleValidateUser = async (e)=>{
        e.preventDefault();
        validateUser(userName, userPassword);
    }

  return (
    <div className="logIn-container">
      {
         validDataLI && <Navigate to={"/home"} />
      }
      <form className='form' onSubmit={handleValidateUser}>
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
