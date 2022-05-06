import './home.css';
import { useContext } from "react";
import UserContext from "../context/userProvider";
import HeaderApp from '../headerApp/headerApp';


const Home = () => {
    const {user} = useContext(UserContext);

  return (
    <div className="home-container">
        <HeaderApp arrow_path="/" title="Chats" />
        <p>Nombre: {user.name}</p>
        <p>Contraseña: {user.password}</p>
    </div>
  );
}

export default Home;
