import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CustomRoute from "./components/CustomRoute";

import Products from "./pages/products";
import Cart from "./pages/cart";

function App() {
  return (
    <div className="app-container">
      <ToastContainer position="top-center" autoClose={2000} />
      <Routes>
        <Route path="*" element={<Navigate to="/produtos" replace />} />
        <Route
          path="/produtos"
          element={
            <CustomRoute>
              <Products />
            </CustomRoute>
          }
        />
        <Route
          path="/carrinho"
          element={
            <CustomRoute>
              <Cart />
            </CustomRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
