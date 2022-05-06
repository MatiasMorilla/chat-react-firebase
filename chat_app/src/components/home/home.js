import { useContext } from "react";
import UserContext from "../context/userProvider";


const Home = () => {
    const {user} = useContext(UserContext);

  return (
    <div className="home-container">
        <p>Nombre: {user.name}</p>
        <p>Contraseña: {user.password}</p>
    </div>
  );
}

export default Home;
