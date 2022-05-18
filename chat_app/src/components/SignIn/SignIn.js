import "./SignIn.css";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router";
// Context
import UserContext from "../context/userProvider";

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
                <input 
                    type="text" 
                    placeholder="nombre de usuario"
                    value={userName}
                    onChange={handleSetName}
                />
                <input 
                    type="password" 
                    placeholder="cree una contraseña"
                    value={userPassword}
                    onChange={handleSetPassword}
                />
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
}

export default SignIn;
