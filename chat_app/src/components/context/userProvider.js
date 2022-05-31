import { createContext, useState } from "react";
// Firebase
import { collection, query, where, getDocs, addDoc, updateDoc, doc} from 'firebase/firestore';
import db from '../../fireBase';
import { getDatabase, set, ref, update  } from "firebase/database";

const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState({id: "", name: "", password: "", friendsList: []});
    const [existUser, setExistUser] = useState(true);
    const [validDataSI, setValidDataSI] = useState(false);
    const [validDataLI, setValidDataLI] = useState(false);
    const [userList, setUserList] = useState([]);
    const userRef = collection(db, "User");
    const databaseRT = getDatabase();

    // Busca un usuario a traves del su nombre y luego setea 
    // una variable de estado en true o false dependiendo si existe o no
    const searchUser = async (userName) => {
        let q = query(userRef, where("name", "==", userName));

        let snapShot = await getDocs(q);

        snapShot.empty == true ? setExistUser(false) : setExistUser(true);
    } 

    // Agrega un usuario a la base de datos
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

    // Obtiene el usuario desde la lista de amigo a traves del nombre
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

    // Valida que el nombre y la contraseña sean correctos
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

    // Agrega un usuario a la lista de amigos y inicializa un chat
    const addFriend = async (name) => {
        let q = query(userRef, where("name", "==", name));
        let userFriend = {};

        let snapshoot = await getDocs(q);
        snapshoot.forEach( (document) => {
            userFriend = {
                id: document.id,
                name: document.data().name,
                friendsList: document.data().friendsList
            }

            userFriend.friendsList.push({id: user.id, name: user.name});
            let userFriendRef = doc(db, "User", userFriend.id);
            updateDoc(userFriendRef, {friendsList: userFriend.friendsList})
        });

        user.friendsList.push({id: userFriend.id, name: userFriend.name}); 
        let userActualref = doc(db, "User", user.id); // Obtenemos la referencia del usaurio actual de la bd
        updateDoc(userActualref, {friendsList: user.friendsList}); // Agregamos el usuario a lista de amigos
        addChat(user.id, userFriend.id);  // Inicializamos el chat
    }

    // Inicializa un chat con una amigo
    const addChat = async (idUser1, idUser2) => {
        let chatsRef = collection(db, "Chats");
        let docRef = await addDoc(chatsRef, {
            users: [idUser1, idUser2],
            messagesList: []
        })
        updateDoc(docRef, {id: docRef.id});
        set(ref(databaseRT,"members/" + docRef.id ), {idUser1: {id: idUser1, state: true}, idUser2: {id: idUser2, state: true}});
        console.log("funciono", docRef.id);
    }

    // Obtiene todos los usuarios de la bd
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

    // Comprueba si existe un usuario en la lista de amigos a traves de su nombre
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