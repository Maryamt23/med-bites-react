import React from "react";
import { useCart } from "../cart/cartContext";

export default function CartPage() {
  const { cart, setQuantity, removeItem, clearCart, getTotal } = useCart();

  return (
    <main>
      <section id="cart-section">
        <h2>Your Cart</h2>

        {(!cart || cart.length === 0) ? (
          <div id="cart-container"><p>Nothing in cart.</p></div>
        ) : (
          <div id="cart-container">
            <table className="cart-table">
              <thead>
                <tr><th>Item</th><th>Quantity</th><th>Price</th><th>Remove</th></tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.name}>
                    <td>{item.name}</td>
                    <td>
                      <div style={{display:'flex', justifyContent:'center', gap:8}}>
                        <button onClick={() => setQuantity(item.name, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => setQuantity(item.name, item.quantity + 1)}>+</button>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button className="remove-item" onClick={() => removeItem(item.name)}>Remove</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <h3 id="cart-total">Total: ${getTotal().toFixed(2)}</h3>
        <button id="clear-cart" onClick={() => { if (window.confirm("Clear the cart?")) clearCart(); }}>Clear Cart</button>
      </section>
    </main>
  );
}
