import React from 'react'
import "./cartItemCard.css"
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


const CardItemCart = ({item, deleteCartItems }) => {
    const { modes } = useSelector((state) => state.DarkMode);
	var root = document.querySelector(':root');
	if (modes) {
		root.style.setProperty('--customColor', 'white');
		root.style.setProperty('--customColorRev', 'white');
	}
	else{
        root.style.setProperty('--customColor', '#212429');
        root.style.setProperty('--customColorRev', 'black');
	}
  return (
    <div className="CartItemCard">
    <img src={item.image} alt="ssa" />
    <div className='sideone'>
      <Link to={`/products/${item.product}`}><h2 className='headname'>{item.name}</h2></Link>
      <h5>{`Price:${item.price} rs`}</h5>
      <p onClick={() => deleteCartItems(item.product)}>Remove</p>
    </div>
  </div>
  )
}

export default CardItemCart