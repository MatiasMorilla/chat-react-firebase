import './headerApp.css';
// react router
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


const HeaderApp = ({arrow_path, title}) => {

  return (
    <div className="home-container">
        <div className="home-header">
            <Button>
              <Link to={arrow_path} className="header-arrow">←</Link>
            </Button>
            <p className="header-title">{title}</p>
            <Button>
              <Link to={"/addFriend"} className="header-plus">+</Link>
            </Button>
        </div>
    </div>
  );
}

export default HeaderApp;
