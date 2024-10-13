/* eslint-disable react/prop-types */

import { useDispatch } from "react-redux";
import { add } from "../utils/cartSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";



const ProductCard = ({ product }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation();

  const handleAdd = () => {
    dispatch(add(product))
      toast.success(`${product.title} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
      });
  }
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          className="product-image"
          src={product.images[0]}
          alt={product.title}
        />
      </div>

      <div className="product-details">
        <h2 className="product-title"> {t(product.title)} </h2>
        <p className="product-price"> ${product.price} </p>
        <button className="add-to-cart-btn" onClick={handleAdd} >Add to cart</button>
      </div>
    </div>
  );
};

export default ProductCard;


