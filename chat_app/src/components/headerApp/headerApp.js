import './headerApp.css';
import { useContext } from 'react';
// react router
import { Link, Navigate } from 'react-router-dom';
// MUI
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import UserContext from '../context/userProvider';


const HeaderApp = ({arrow_path, title}) => {
  const {user} = useContext(UserContext);

  return (
    <div className="home-container">
        {
          user.id == "" && <Navigate to={"/"} />
        }
        <div className="home-header">
            <Button className="header-btn">
              <Link to={arrow_path} className="header-arrow">
                <ArrowBackIosIcon fontSize="small"/>
              </Link>
            </Button>
            <p className="header-title">{title}</p>
            <Button className="header-btn">
              <Link to={"/addFriend"} className="header-plus">
                <AddIcon fontSize="small"/>
              </Link>
            </Button>
        </div>
    </div>
  );
}

export default HeaderApp;
