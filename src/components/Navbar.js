import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/cartContext";

export default function Navbar() {
  const { getItemsCount } = useCart();
  const count = getItemsCount();
  const [open, setOpen] = useState(false);

  return (
    <header>
      <div className="logo">🍴 Mediterranean Bites</div>
      <nav id="navbar">
        <ul className={open ? "active" : ""}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          {/* <li><Link to="/cart">🛒 Cart {count > 0 ? `(${count})` : ""}</Link></li> */}
        </ul>
        <div className="hamburger" onClick={() => setOpen(o => !o)}>☰</div>
        <li><Link to="/cart">🛒 Cart {count > 0 ? `(${count})` : ""}</Link></li>
      </nav>
    </header>
  );
}
