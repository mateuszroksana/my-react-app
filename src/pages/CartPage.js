import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();
  
    const totalCost = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
  
    return (
      <div className="container mt-4">
        <h2>Koszyk</h2>
        {cartItems.length === 0 ? (
          <p>Twój koszyk jest pusty.</p>
        ) : (
          <div>
            {cartItems.map(item => (
              <div key={item._id} className="card mb-3">
                <div className="card-body d-flex justify-content-between align-items-center">
                  <div>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">Cena: {item.price}</p>
                    <p className="card-text">Ilość: {item.quantity}</p>
                  </div>
                  <button className="btn btn-danger" onClick={() => removeFromCart(item._id)}>
                    Usuń
                  </button>
                </div>
              </div>
            ))}
            <h4>Łączna kwota: {totalCost} PLN</h4>
            <button className="btn btn-warning me-2" onClick={clearCart}>Wyczyść koszyk</button>
            <button className="btn btn-success" onClick={() => navigate('/checkout')}>Zamów</button>
          </div>
        )}
      </div>
    );
  };

export default Cart;
