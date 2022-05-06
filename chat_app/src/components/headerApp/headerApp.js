import './headerApp.css';
// react router
import { Link } from 'react-router-dom';


const HeaderApp = ({arrow_path, title}) => {

  return (
    <div className="home-container">
        <div className="home-header">
            <Link to={arrow_path} className="header-arrow">←</Link>
            <p className="header-title">{title}</p>
            <Link to={"/addFriend"} className="header-plus">+</Link>
        </div>
    </div>
  );
}

export default HeaderApp;
