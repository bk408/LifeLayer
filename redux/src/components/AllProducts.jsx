
import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "./ProductCard";
import { useTranslation } from "react-i18next";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // State for filters
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchName, setSearchName] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState("Price");
  const [categories, setCategories] = useState([]);
  const [debounceName, setDebounceName] = useState("") // state for debouncing

  const { t } = useTranslation()

  // Predefined price ranges
  const priceRanges = [
    { label: "Price", min: 0, max: Infinity },
    { label: "$0 - $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 - $500", min: 200, max: 500 },
    { label: "$500 and above", min: 500, max: Infinity },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://api.escuelajs.co/api/v1/products"
        );
        const data = response.data;
        setProducts(data);
        setFilteredProducts(data);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(data.map((product) => product.category?.name)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);


  // Debounce logic for search name
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceName(searchName)
    }, 500); // delay for 500ms

    return () => {
      clearTimeout(handler)
    }

  }, [searchName])

  useEffect(() => {
    filterProducts();
  }, [selectedCategory, debounceName, selectedPriceRange, products]);

  // Filter logic
  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (product) => product.category?.name === selectedCategory
      );
    }

    // Filter by name (case-insensitive)
    if (debounceName) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(debounceName.toLowerCase())
      );
    }

    // Filter by price range
    if (selectedPriceRange !== "Price") {
      const { min, max } = priceRanges.find(
        (range) => range.label === selectedPriceRange
      );
      filtered = filtered.filter(
        (product) => product.price >= min && product.price <= max
      );
    }

    setFilteredProducts(filtered);
  };

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

        {/* Category filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Name filter */}
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />

        {/* Price filter */}
        <select
          value={selectedPriceRange}
          onChange={(e) => setSelectedPriceRange(e.target.value)}
        >
          {priceRanges.map((range) => (
            <option key={range.label} value={range.label}>
              {range.label}
            </option>
          ))}
        </select>
      </div>

      {/* Render filtered products */}
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Products;
