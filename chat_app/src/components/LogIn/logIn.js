import { useState } from 'react';
//Components
import './logIn.css';
//FireBase
import db from '../../fireBase';

function LogIn() {
    const [user, setUser] = useState({name: "", password: ""});
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleSetName = (e) => {
        setUserName(e.target.value);
    } 

    const handleSetPassword = (e) => {
        setUserPassword(e.target.value);
    }
    
    const handleSetUser = async (e) => {
        e.preventDefault();
        // busccar nueva manera firebase
    }

  return (
    <div className="logIn-container">
      <form className='form' onSubmit={handleSetUser}>
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
            <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default LogIn;
