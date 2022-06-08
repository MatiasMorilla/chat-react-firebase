import './home.css';
import { useContext } from "react";
import UserContext from "../context/userProvider";
import HeaderApp from '../headerApp/headerApp';
import ItemFriend from '../itemFriend/itemFriend';
import { Link } from 'react-router-dom';


const Home = () => {
  const {user, deleteFriend} = useContext(UserContext);

  return (
    <div className="home-container">
        <HeaderApp arrow_path="/" title="Chats" />
        {
            user.friendsList.map( (friend) => {
              return(
                <Link 
                  to={`/chat/${friend.name}`}
                  key={friend.id} 
                  className="home-link"
                >
                    <ItemFriend  className={"home-itemFriend"} name={friend.name} deleteFriend={deleteFriend}/>
                </Link>
              );
            })
        }
    </div>
  );
}

export default Home;
