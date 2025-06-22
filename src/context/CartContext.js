import React, { createContext, useContext, useState } from 'react';

// Tworzenie kontekstu
const CartContext = createContext();

// Hook do łatwego dostępu do kontekstu
export const useCart = () => useContext(CartContext);

// Provider, który otacza aplikację i dostarcza stan koszyka
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Funkcja dodająca produkt do koszyka
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      // Sprawdzamy, czy produkt już jest w koszyku
      const existingProduct = prevItems.find(item => item._id === product._id);
      
      if (existingProduct) {
        // Jeśli produkt istnieje, zwiększamy ilość
        return prevItems.map(item =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Jeśli produkt nie istnieje, dodajemy go z ilością 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // Funkcja usuwająca produkt z koszyka
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  // Funkcja czyszcząca koszyk
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
