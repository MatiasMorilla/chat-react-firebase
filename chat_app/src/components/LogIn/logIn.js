import { useContext, useState } from 'react';
//Components
import './logIn.css';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/userProvider';
// MUI
import { Button, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';


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
            <div className='input-container'>
                <AccountCircleIcon />
                <TextField 
                    type="text" 
                    className='input-name' 
                    label="Nombre de usuario"
                    value={userName}
                    onChange={handleSetName}
                    variant="standard"
                    autoFocus={true}
                />
            </div>
            <div className='input-container'>
                <LockIcon />
                <TextField 
                    type="password" 
                    className='input-password' 
                    label="Contraseña" 
                    value={userPassword}
                    onChange={handleSetPassword}
                    variant="standard"
                />
            </div>
            <div className='links-container'>
                <Button variant='contained'>
                    <Link to={"/SignIn"}>
                        Registrarse
                    </Link>
                </Button>
                <Button type="submit" variant='contained'>
                    Enviar
                </Button>
            </div>
      </form>
    </div>
  );
}

export default LogIn;
