import "./SignIn.css";
import { useEffect, useState } from "react";
// firebase
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import db from "../../fireBase";
import { Navigate } from "react-router";

const SignIn = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [validData, setValidData] = useState(false);
    const [existUser, setExistUser] = useState(true);

    const handleSetName = (e) => {
        setUserName(e.target.value);
    } 

    const handleSetPassword = (e) => {
        setUserPassword(e.target.value);
    }

     const searchUser = async () => {
        let userRef = collection(db, "User");
        console.log(userName);
        let q = query(userRef, where("name", "==", userName));

        let snapShot = await getDocs(q);

        console.log(snapShot.empty);

        snapShot.empty == true ? setExistUser(false) : setExistUser(true);
    } 

    const handleAddUser = async (e) => {
        e.preventDefault();
        await searchUser();

        if(!existUser)
        {
            const docRef = await addDoc(collection(db, "User"),{
                name: userName,
                password: userPassword
            });

            setValidData(true);
            console.log("funciono", docRef.id);
        }
        else
        {
            setValidData(false);    
            console.log("Ese usuario ya existe");
        }
    }

/*     useEffect( () => {
        searchUser("Matias");
    }, []);
 */
    return (
        <div className="signIn-container">
            {
                validData && <Navigate to={"/"} />
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
