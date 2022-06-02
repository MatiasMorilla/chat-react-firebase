import "./SignIn.css";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
// Context
import UserContext from "../context/userProvider";
// MUI
import { Button, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const SignIn = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const {addUser, validDataSI} = useContext(UserContext);

    const handleSetName = (e) => {
        setUserName(e.target.value);
    } 

    const handleSetPassword = (e) => {
        setUserPassword(e.target.value);
    }


    const handleAddUser = async (e) => {
        e.preventDefault();
        addUser(userName, userPassword);
    }


    return (
        <div className="signIn-container">
            {
                validDataSI && <Navigate to={"/"} />
            }
            <form className="form" onSubmit={handleAddUser}>
                <div className='input-container'>
                    <AccountCircleIcon />
                    <TextField 
                        type="text" 
                        className='input-name' 
                        label="Nombre de usuario"
                        value={userName}
                        onChange={handleSetName}
                        variant="standard"
                        id="standard-basic"
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
                        id="standard-basic"
                    />
                </div>
                <div className='links-container'>
                    <Button type="submit" variant='contained'>
                        Enviar
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default SignIn;
