/* eslint-disable no-unused-vars */

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { add, clearCart, remove } from "../utils/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();
  const cartItems = useSelector((state) => state.cart.items);
  //console.log(cartItems);

  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const dispatch = useDispatch();

  const handleIncrease = (item) => {
    dispatch(add(item));
     toast.info(`Product added to cart`, {
       position: "top-right",
       autoClose: 2000,
     });
  };

  const handleDecrease = (item) => {
    dispatch(remove(item));
      toast.warn(`Product removed from cart`, {
        position: "top-right",
        autoClose: 2000,
      });
  };

  const clearBtn = () => {
    dispatch(clearCart());
      toast.error(t("Cart cleared"), {
        position: "top-right",
        autoClose: 2000,
      });
  };

  if (cartItems.length === 0) {
    return <div>{t("cart.empty")}</div>;
  }

  // payment integration

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Pk837FYq8DNTqK3MqC8BpS50wKpg1ErHe6tsq5pAug441QsFHP6Hhq5QIGQBx2xpCPtNhkrzuJbBMRIaDsv2EFp0090DXxq3d"
    );

    const body = {
      products: cartItems,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:7000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  return (
    <div className="cart-container">
      <h1>{t("navbar.cart")}</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <div className="cart-item-details">
            <img className="cart-image" src={item.images[0]} alt={item.title} />
          </div>
          <div className="cart-item-info">
            <h2> {item.title} </h2>
            <div className="cart-item-quantity">
              <button onClick={() => handleIncrease(item)}>+</button>
              <span> {item.quantity} </span>
              <button onClick={() => handleDecrease(item)}>-</button>
            </div>

            <p> ${item.totalPrice.toFixed(2)} </p>
          </div>
        </div>
      ))}

      <div className="cart-total"></div>
         <h2>{t('cart.total', { price: totalPrice.toFixed(2) })}</h2>
      <button onClick={clearBtn}>{t('cart.clear')}</button>
      <button className="check-out" onClick={makePayment}>{t('cart.checkout')}</button>
      
    </div>
  );
};

export default Cart;
