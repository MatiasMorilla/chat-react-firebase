import { createContext, useState } from "react";
// Firebase
import { collection, query, where, getDocs, addDoc, updateDoc, doc} from 'firebase/firestore';
import db from '../../fireBase';;

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState({id: "", name: "", password: "", friendsList: []});
    const [existUser, setExistUser] = useState(true);
    const [validDataSI, setValidDataSI] = useState(false);
    const [validDataLI, setValidDataLI] = useState(false);
    const [userList, setUserList] = useState([]);
    const userRef = collection(db, "User");

    const searchUser = async (userName) => {
        let q = query(userRef, where("name", "==", userName));

        let snapShot = await getDocs(q);

        snapShot.empty == true ? setExistUser(false) : setExistUser(true);
    } 

    const addUser = async (userName, userPassword, friendsList = []) => {
        searchUser(userName);

        if(!existUser)
        {
            const docRef = await addDoc(userRef,{
                name: userName,
                password: userPassword,
                friendsList: friendsList
            });

            updateDoc(docRef, {id: docRef.id});

            setValidDataSI(true);
            console.log("funciono", docRef.id);
        }
        else
        {
            setValidDataSI(false);    
            console.log("Ese usuario ya existe");
        }

    }

    const getUserFriend = (friendName) => {
        let userFriend = {};

        for(let friend of user.friendsList)
        {
            if(friend.name === friendName)
            {
                userFriend = friend
            }
        }

        return userFriend;
    }

    const validateUser = async (userName, userPassword) => {
        const q =  query(userRef, where("name", "==", userName), where("password", "==", userPassword));
        
        const snapshoot = await getDocs(q);
        
        if(snapshoot.empty === false)
        {
            snapshoot.forEach( (doc) => {
              setUser(doc.data());
              console.log(doc.data());
            });
            
            setValidDataLI(true)
        }
        else
        {
            console.log("Los datos son incorrectos");
            setValidDataLI(false);
        }
    }

    const addFriend = async (name) => {
        let q = query(userRef, where("name", "==", name));
        let userFriend = {};

        let snapshoot = await getDocs(q);
        snapshoot.forEach( (doc) => {
            userFriend = {
                id: doc.id,
                name: doc.data().name
            }
        });

        user.friendsList.push(userFriend);

        let q2 = query(userRef, where("name", "==", user.name));
        let snapshoot2 = await getDocs(q2);
        snapshoot2.forEach( (document) => {
            let userActualref = doc(db, "User", `${document.id}`);
            updateDoc(userActualref, {friendsList: user.friendsList});
            addChat(document.id, userFriend.id);
        });

    }

    const addChat = async (idUser1, idUser2) => {
        let chatsRef = collection(db, "Chats");
        let docRef = await addDoc(chatsRef, {
            idUser1: idUser1,
            idUser2: idUser2,
            messagesList: []
        })

        console.log("funciono", docRef.id);
    }

    const getUsers = async () => {
        let snapshoot = await getDocs(userRef);
        let arrayPersons = [];
  
        snapshoot.forEach( (doc) => {
            arrayPersons.push(doc.data());
        });
  
        setUserList(arrayPersons);
      }

    // Obtiene todos los usuarios excepto al usuario actual y sus amigos 
    const getUsersWithoutAUF = async () => {
        let snapshoot = await getDocs(userRef);
        let arrayPersons = [];

        snapshoot.forEach( (doc) => {
            if(doc.data().name !== user.name && !existFriend(doc.data().name))
            {
                arrayPersons.push(doc.data());
            }
        });
        
        setUserList(arrayPersons);
      }

    const existFriend =  (friendName) => 
    {
        let exist = false;

        for(let friend of user.friendsList)
        {
            if(friend.name === friendName)
            {
                exist = true;
            }
        }

        return exist;
    }

    const data = {
        user,
        setUser,
        existUser,
        validDataSI,
        validDataLI,
        searchUser,
        addUser,
        getUserFriend,
        validateUser,
        addFriend,
        getUsers,
        getUsersWithoutAUF,
        userList
    }

    return(
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    );
}

export {UserProvider};
export default UserContext;