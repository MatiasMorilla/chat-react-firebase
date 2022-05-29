import { createContext, useState } from "react";
// Firebase
import { getDatabase, ref, set, update, onValue } from "firebase/database";

const UserContextRT = createContext();

const UserProviderRT = ({children}) => {
    const [user, setUser] = useState({id: "1", name: "Matias", password: "213", friendsList: []});
    const db = getDatabase();

    const validateUser = () => {
        let usersRef = ref(db, "users");
        onValue(usersRef, (snapshoot) => {
            let data = snapshoot.val();
            console.log(data);
        })
    }


    const data = {
        user,
        validateUser
    }

    return(
        <UserContextRT.Provider value={data}>
            {children}
        </UserContextRT.Provider>
    );
}

export {UserProviderRT};
export default UserContextRT;