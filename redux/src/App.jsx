/* eslint-disable no-unused-vars */
import { Provider } from "react-redux";
import "./App.css";

import Navbar from "./components/Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import store from "./utils/store";

import { ToastContainer } from "react-toastify";

import { lazy, Suspense } from "react";
import Loading from "./components/Loading";

const AllProducts = lazy(() => import("./components/AllProducts"));
const Contact = lazy(() => import("./components/Contact"));
const ProductBody = lazy(() => import("./components/ProductBody"));
const Success = lazy(() => import("./components/Success"));
const Cancel = lazy(() => import("./components/Cancel"));
const Cart = lazy(() => import("./components/Cart"));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<ProductBody />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />

            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Suspense>
        <ToastContainer />
      </Router>
    </Provider>
  );
}

export default App;
