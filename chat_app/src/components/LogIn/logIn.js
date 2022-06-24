import { useContext, useState } from 'react';
//Components
import './logIn.css';
import { Link, Navigate } from 'react-router-dom';
import UserContext from '../context/userProvider';
// MUI
import { Alert, Button, Snackbar, TextField } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';


function LogIn() {
    const {
            validateUser, 
            validDataLI, 
            setValidDataSI, 
            openSuccessAlert, 
            setOpenSuccessAlert, 
            openErrorAlert, 
            setOpenErrorAlert, 
            errorMessage, 
        } = useContext(UserContext);
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const vertical = "bottom";
    const horizontal = "center";

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

    const handleCloseSuccesAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSuccessAlert(false)
    } 

    const handleCloseErrorAlert = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenErrorAlert(false)
    } 

    const handleResertValidDataSI = () => {
        setValidDataSI(false)
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
                    <Button variant='contained' onClick={handleResertValidDataSI}>
                        <Link to={"/SignIn"}>
                            Registrarse
                        </Link>
                    </Button>
                    <Button type="submit" variant='contained'>
                        Enviar
                    </Button>
                </div>
        </form>
        <Snackbar 
            open={openSuccessAlert} 
            autoHideDuration={6000} 
            onClose={handleCloseSuccesAlert}
            anchorOrigin={{ vertical, horizontal }}
        >
                <Alert onClose={handleCloseSuccesAlert} severity="success">
                    Se ha creado tu usuario con exito!
                </Alert>
        </Snackbar>
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
    </div>
  );
}

export default LogIn;
