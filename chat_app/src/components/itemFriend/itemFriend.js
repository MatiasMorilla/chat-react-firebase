import './itemFriend.css';
// MUI

const ItemFriend = ({name}) => {

  return (
    <div className="itemFriend-container">
        <p>Nombre: {name}</p>
        <span>+</span>
    </div>
  );
}

export default ItemFriend;
