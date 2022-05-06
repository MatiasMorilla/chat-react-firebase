import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState({name: "", password: "", friendsList: []});

    const addFriend = (friend) => {
        user.friendsList.push(friend);
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