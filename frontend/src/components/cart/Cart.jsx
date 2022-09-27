import React, { Fragment } from "react";
import "./cart.css";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import CardItemCart from "./CardItemCart";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import { Typography } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import { useAlert } from "react-alert";

import MetaData from "../layout/MetaData"
const Cart = () => {
  const alert = useAlert();
  const { modes } = useSelector((state) => state.DarkMode);
  var root = document.querySelector(":root");
  if (modes) {
    root.style.setProperty("--customColor", "white");
    root.style.setProperty("--customColorRev", "white");
    root.style.setProperty("--light", "rgba(255, 255, 255, 0.514)");
  } else {
    root.style.setProperty("--customColor", "#212429");
    root.style.setProperty("--customColorRev", "black");
    root.style.setProperty("--light", "rgba(0, 0, 0, 0.616)");
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      alert.error(`Sorry! we only have ${quantity} product in stock `)
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
      
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  };

  return (
    <Fragment>
    <MetaData title="Cart" />
      {cartItems.length === 0 ? (
        <div className="emptyCart">
          <div className="inner1">
            <RemoveShoppingCartIcon />
          </div>
          <div className="inner2">
            <Typography>No Product in Your Cart</Typography>
            <Link to="/product">View Products</Link>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems
                .map((item) => (
                  <div className="cartContainer" key={item.product}>
                    <CardItemCart
                      item={item}
                      deleteCartItems={deleteCartItems}
                    />
                    <div className="cartInput">
                      <button
                        onClick={() =>
                          decreaseQuantity(item.product, item.quantity)
                        }
                      >
                        -
                      </button>
                      <input type="number" value={item.quantity} readOnly />
                      <button
                        onClick={() =>
                          increaseQuantity(
                            item.product,
                            item.quantity,
                            item.stock
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                    <p className="cartSubtotal">{`${
                      item.price * item.quantity
                    }`}</p>
                  </div>
                ))
                .reverse()}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`Rs. ${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
