// src/components/ProductCard.js
//       <img src="https://via.placeholder.com/150" alt={product.name} className="card-img-top" />

import React from 'react';
import { useCart } from '../context/CartContext';

const cardStyle = {
  background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)',
  color: 'white',
};

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
  
    return (
      <div className="card" style={cardStyle}>
        <img src={product.imageUrl} alt={product.name} className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{product.name}</h5>
          <p className="card-text">{product.price}</p>
          <button className="btn btn-primary" onClick={() => addToCart(product)}>
            Dodaj do koszyka
          </button>
        </div>
      </div>
    );
  }

export default ProductCard;
