import "./SignIn.css";
import { useContext, useState } from "react";
import { Navigate } from "react-router";
// Context
import UserContext from "../context/userProvider";
// MUI
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
// crypt
const CryptoJs = require("crypto-js");

const SignIn = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const {addUser, validDataSI, openErrorAlert, setOpenErrorAlert, errorMessage, setErrorMessage} = useContext(UserContext);
    const vertical = "bottom";
    const horizontal = "center";

    const handleSetName = (e) => {
        setUserName(e.target.value);
    } 

    const handleSetPassword = (e) => {
        setUserPassword(e.target.value);
    }

    const handleCloseErrorAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorAlert(false)
    } 

    const handleAddUser = async (e) => {
        e.preventDefault();

        if(userName.length !== 0 && userPassword.length !== 0)
        {
            let encryptedPassword = CryptoJs.AES.encrypt(userPassword, userPassword).toString();
            addUser(userName, encryptedPassword);
        }
        else
        {
            setErrorMessage("Debes completar todos los campos!");
            setOpenErrorAlert(true);
        }

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
                    <Button type="submit" variant='contained'>
                        Enviar
                    </Button>
                </div>
                <Snackbar 
                    open={openErrorAlert} 
                    autoHideDuration={6000} 
                    onClose={handleCloseErrorAlert}
                    anchorOrigin={{ vertical, horizontal }}
                >
                        <Alert onClose={handleCloseErrorAlert} severity="error">
                            {errorMessage}
                        </Alert>
                </Snackbar>
            </form>
        </div>
    );
}

export default SignIn;
