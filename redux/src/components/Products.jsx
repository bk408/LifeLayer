import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { t } = useTranslation();
  const navigate = useNavigate();
  const maxProductShow = 4;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        setProducts(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <p> Error: {error.message} </p>
      </div>
    );
  }
  return (
    <div className="products-container">
      <div className="products-header">
        <h1>{t("products.header")}</h1>

        <button
          onClick={() => navigate("/all-products")}
          className="view-all-btn"
        >
          View All
        </button>
      </div>

      <div className="products-list">
        {products.slice(0, maxProductShow).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
