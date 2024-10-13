/* eslint-disable no-unused-vars */
import { Provider } from "react-redux";
import "./App.css";

import AllProducts from "./components/AllProducts";
import Contact from "./components/Contact";

import Navbar from "./components/Navbar";
import ProductBody from "./components/ProductBody";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import store from "./utils/store";
import Cart from "./components/Cart";

import { ToastContainer } from "react-toastify";
import Success from "./components/Success";
import Cancel from "./components/Cancel";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<ProductBody />} />
          <Route path="/all-products" element={<AllProducts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />

          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
