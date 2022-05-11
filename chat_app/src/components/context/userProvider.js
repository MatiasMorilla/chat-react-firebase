import { createContext, useState } from "react";
// Firebase
import { collection, query, where, getDocs} from 'firebase/firestore';
import { update, ref } from 'firebase/database';
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
        /* let q2 = query(userRef, where(name, "==", "Matias"));
        let snapshoot2 = await getDocs(q2);
        snapshoot2.forEach( (doc) => {
            doc.update({friendsList : ["caca"]});
        }); */

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