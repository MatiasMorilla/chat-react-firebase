import './itemFriend.css';
// MUI
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';

const ItemFriend = ({name, addFriend}) => {

    const getFriend = () => {
        addFriend(name);
    }

    return (
        <div className="itemFriend-container">
            <div className='user-info'>
                <p>Nombre: {name}</p>
                <Button onClick={getFriend}>
                    +
                </Button>
            </div>
            <Divider className='divider'/>
        </div>
    );
}

export default ItemFriend;
