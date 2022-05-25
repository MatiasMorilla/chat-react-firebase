import './itemFriend.css';
// MUI
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { useState } from 'react';

const ItemFriend = ({name, addFriend = null, deleteFriend = null, addOrdelete = null}) => {
    const [addedFriend, setAddedFriend] = useState(false);

    const getFriend = () => {
        addFriend(name);
        setAddedFriend(true);
    }

    const removeFriend = () => {
        console.log("delete");
    }

    return (
        <div className={`itemFriend-container ${addedFriend ? 'added' : ''}`}>
            <div className='user-info'>
                <p>{name}</p>
                <Button 
                    onClick={addFriend !== null ? getFriend : removeFriend} 
                    className="itemFriend-btn" 
                >
                    {addOrdelete === 'add' ? '+' : "x"}
                </Button>
            </div>
            <Divider className='divider'/>
        </div>
    );
}

export default ItemFriend;
