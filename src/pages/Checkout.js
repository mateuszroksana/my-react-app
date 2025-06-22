import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    paymentMethod: 'przelew'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      alert('Wszystkie pola są wymagane!');
      return;
    }

    const orderData = {
      email: formData.email,
      customerName: `${formData.firstName} ${formData.lastName}`,
      address: formData.address,
      paymentMethod: formData.paymentMethod,
      products: cartItems.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalCost: cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0).toFixed(2)
    };

    try {
      await axios.post('${process.env.REACT_APP_API_URL}/api/orders', orderData);
      alert('Zamówienie zostało złożone!');
      clearCart();

      // Przekierowanie w zależności od wybranej metody płatności
      if (formData.paymentMethod === 'przelew') {
        navigate('/payment-instructions');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Błąd podczas składania zamówienia:', error);
      alert('Nie udało się złożyć zamówienia. Spróbuj ponownie.');
    }
  };

  return (
    <div className="container mt-4">
      <h2>Potwierdzenie zamówienia</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Imię</label>
          <input type="text" name="firstName" className="form-control" value={formData.firstName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Nazwisko</label>
          <input type="text" name="lastName" className="form-control" value={formData.lastName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="email" className="form-control" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Adres do wysyłki</label>
          <input type="text" name="address" className="form-control" value={formData.address} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label>Metoda płatności</label>
          <select name="paymentMethod" className="form-control" value={formData.paymentMethod} onChange={handleChange}>
            <option value="przelew">Przelew</option>
            <option value="za pobraniem">Za pobraniem</option>
          </select>
        </div>
        <button type="submit" className="btn btn-success">Potwierdź zamówienie</button>
      </form>
    </div>
  );
};

export default Checkout;
