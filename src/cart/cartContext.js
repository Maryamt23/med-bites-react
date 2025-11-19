import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

const CART_KEY = "cart";

function readCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCartFromStorage());

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  function addItem(name, price, qty = 1) {
    setCart(prev => {
      const copy = [...prev];
      const found = copy.find(i => i.name === name);
      if (found) {
        found.quantity = (found.quantity || 0) + qty;
      } else {
        copy.push({ name, price: parseFloat(price), quantity: qty });
      }
      return copy;
    });
  }

  function removeItem(name) {
    setCart(prev => prev.filter(i => i.name !== name));
  }

  function setQuantity(name, qty) {
    setCart(prev => {
      const copy = prev.map(i => ({ ...i }));
      const item = copy.find(i => i.name === name);
      if (!item) return prev;
      item.quantity = qty;
      return copy.filter(i => i.quantity > 0);
    });
  }

  function clearCart() {
    setCart([]);
  }

  function getTotal() {
    return cart.reduce((s, i) => s + (i.price || 0) * (i.quantity || 0), 0);
  }

  function getItemsCount() {
    return cart.reduce((s, i) => s + (i.quantity || 0), 0);
  }

  const value = {
    cart,
    addItem,
    removeItem,
    setQuantity,
    clearCart,
    getTotal,
    getItemsCount
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
