import React from "react";
import { useCart } from "../cart/cartContext";

export default function Menu() {
  const { addItem } = useCart();

  const appetizers = [
    ["Hummus", 4.39],
    ["Baba Ganoush", 5.59],
    ["Green Salad", 6.99],
    ["Fries", 4.99],
    ["Tahini", 2.99]
  ];

  const entrees = [
    ["Grilled Chicken", 18.00],
    ["Beef Shawarma", 10.99],
    ["Chicken Shawarma", 9.99],
    ["6-PC Kofta", 9.49],
    ["Koshari Platter", 9.49],
    ["5-PC Falafel", 5.49]
  ];

  return (
    <main>
      <section>
        <h2>Our Menu</h2>
        <table className="menu-table">
          <thead>
            <tr>
              <th>Appetizers</th>
              <th>Price</th>
              <th>Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {appetizers.map(([name, price]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>${price.toFixed(2)}</td>
                <td>
                  <button className="add-to-cart" onClick={() => addItem(name, price)}>Add to Cart</button>
                </td>
              </tr>
            ))}

            <tr>
              <th>Entrees</th>
              <th>Price</th>
              <th>Add to Cart</th>
            </tr>

            {entrees.map(([name, price]) => (
              <tr key={name}>
                <td>{name}</td>
                <td>${price.toFixed(2)}</td>
                <td>
                  <button className="add-to-cart" onClick={() => addItem(name, price)}>Add to Cart</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}
