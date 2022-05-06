import './itemFriend.css';
// MUI
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';


const ItemFriend = ({name}) => {

    return (
        <div className="itemFriend-container">
            <div className='user-info'>
                <p>Nombre: {name}</p>
                <Button>+</Button>
            </div>
            <Divider className='divider'/>
        </div>
    );
}

export default ItemFriend;
