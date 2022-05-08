import { createContext, useState } from "react";
// Firebase
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../../fireBase';

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState({name: "", password: "", friendsList: []});

    const addFriend = async (name) => {
        let userRef = collection(db, "User");
        let q = query(userRef, where("name", "==", name));
        let userFriend = {};

        let snapshoot = await getDocs(q);
        snapshoot.forEach( (doc) => {
            userFriend = doc.data();
        });

        user.friendsList.push(userFriend);
        // falta actualizar la db
    }

    const data = {
        user,
        setUser,
        addFriend
    }

    return(
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
}

export {UserProvider};
export default UserContext;