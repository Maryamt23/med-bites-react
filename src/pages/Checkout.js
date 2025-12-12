// src/pages/Checkout.js
import React, { useState } from "react";
import { useCart } from "../cart/cartContext";
import { placeOrder } from "../api";

export default function Checkout() {
  const { cart, clearCart, getTotal } = useCart();
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const sessionId = sessionStorage.getItem("sessionId");

  const handleChange = (e) => {
    setCustomer((c) => ({ ...c, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart.length) {
      setMessage("Cart is empty.");
      return;
    }
    setLoading(true);
    try {
      const orderData = {
        customer,
        items: cart,
        total: getTotal(),
        sessionId
      };
      const order = await placeOrder(orderData);
      setMessage(`Order placed! Order ID: ${order._id}`);
      clearCart();
    } catch (err) {
      console.error(err);
      setMessage("Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <section>
        <h2>Checkout</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((it, i) => (
                  <tr key={i}>
                    <td>{it.name}</td>
                    <td>{it.quantity}</td>
                    <td>${(it.price * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3>Total: ${getTotal().toFixed(2)}</h3>

            <form onSubmit={handleSubmit} style={{ maxWidth: 480, margin: "1rem auto", textAlign: "left" }}>
              <label>
                Name:
                <input name="name" required value={customer.name} onChange={handleChange} />
              </label>
              <br />
              <label>
                Email:
                <input name="email" type="email" required value={customer.email} onChange={handleChange} />
              </label>
              <br />
              <label>
                Phone:
                <input name="phone" value={customer.phone} onChange={handleChange} />
              </label>
              <br />
              <label>
                Address:
                <input name="address" value={customer.address} onChange={handleChange} />
              </label>
              <br />
              <button type="submit" disabled={loading}>
                {loading ? "Placing order..." : "Place Order"}
              </button>
            </form>
          </>
        )}

        {message && <p>{message}</p>}
      </section>
    </main>
  );
}
