import React, { Suspense, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Navbar from "./component/navbar/navbar";
import Menu from "./component/navbar/menu/menu";
import Slider from "./component/slider/slider";
import Product from "./component/product/produt";
import Search from "./component/search/search";
import ProductDetail from "./component/product/viewDetail";
import DashboardMenu from "./component/dashboard/dashboard";
import Cart from "./component/cart/cart";
import Payment from "./component/payment/payment";
import Signin from "./component/login/singin";
import SignupPage from "./component/login/signup";
import ProductList from "./component/ProductsList/productlist";
import Footer from "./component/navbar/Footer";
import Myorder from "./component/cart/Myorder";
import Wishlist from "./component/cart/Wishlist";

const ProtectedRoute = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default function App() {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  console.log("child to parent ", search);

  return (
    <Router>
      <Routes>
    <Route path="/products/:filter" element={
      <>
      <ProductList/>
      </>
    } />

        <Route
          path="/"
          element={
            <>
              <Navbar search={search} handleChange={handleChange} />
              <Menu />
              <Slider />
              <Product />
            <Footer />
              
            </>
          }
        />

        <Route
          path="/search"
          element={
            <>
              <Navbar search={search} handleChange={handleChange} />
              <Menu />
              <Search search={search} />
            </>
          }
        />

        <Route
          path="/product/:id"
          element={
            <>
              <Navbar search={search} handleChange={handleChange} />
              <Menu />
              <ProductDetail />
            </>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <>
                <Navbar search={search} handleChange={handleChange} />
                <Menu />
                <DashboardMenu />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart/:id"
          element={
            <ProtectedRoute>
              <>
                <Navbar search={search} handleChange={handleChange} />
                <Menu />
                <Cart />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <>
                <Navbar search={search} handleChange={handleChange} />
                <Menu />
                <Cart />
              </>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/Myorder" element={<Myorder />} />
        <Route path="/Wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  );
}
