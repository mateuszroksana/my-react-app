// src/services/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TeasPage from './pages/TeasPage';
import HerbalTeasPage from './pages/HerbalTeasPage';
import AdminPage from './pages/AdminPage';  // Dodajemy stronę AdminPage
import CartPage from './pages/CartPage';  // Dodajemy stronę CartPage
import Checkout from './pages/Checkout';
import BankTransferInstructions from './pages/BankTransferInstructions';
import LoginPage from './pages/LoginPage';
import OrdersPage from './pages/OrdersPage';
import ProductsPage from './pages/ProductsPage';

// Funkcja sprawdzająca czy użytkownik jest zalogowany
const isAuthenticated = () => {
  return localStorage.getItem('isLoggedIn') === 'true';
};

// Ochrona trasy przed dostępem bez logowania
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teas" element={<TeasPage />} />
          <Route path="/herbal-teas" element={<HerbalTeasPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/payment-instructions" element={<BankTransferInstructions />} />
          <Route path="/login" element={<LoginPage />} />
          {/* Ochroniona trasa dla AdminPage */}
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute>
              <OrdersPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
