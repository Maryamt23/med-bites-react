import React, { useEffect, useState } from "react";
import { fetchMenu } from "../api";
import { useCart } from "../cart/cartContext";

export default function Menu() {
  const [menu, setMenu] = useState(null); 
  const { addItem } = useCart();

  useEffect(() => {
    let mounted = true;
    fetchMenu()
      .then((items) => {
        if (!mounted) return;
        setMenu(items);
      })
      .catch((err) => {
        console.error("Menu fetch error", err);
        if (mounted) setMenu([]);
      });
    return () => (mounted = false);
  }, []);

  if (menu === null) {
    return (
      <main>
        <section>
          <h2>Our Menu</h2>
          <p>Loading menu…</p>
        </section>
      </main>
    );
  }

  if (!menu.length) {
    return (
      <main>
        <section>
          <h2>Our Menu</h2>
          <p>No menu items available.</p>
        </section>
      </main>
    );
  }

  const appetizers = menu.filter((m) => m.category?.toLowerCase() === "appetizer");
  const entrees = menu.filter((m) => m.category?.toLowerCase() === "entree");

  return (
    <main>
      <section>
        <h2>Our Menu</h2>
        <table className="menu-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Add to Cart</th>
            </tr>
          </thead>
          <tbody>
            {appetizers.length > 0 && (
              <>
                <tr>
                  <th colSpan="3">Appetizers</th>
                </tr>
                {appetizers.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 6 }}
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          {item.description && <div style={{ fontSize: 12 }}>{item.description}</div>}
                        </div>
                      </div>
                    </td>
                    <td>${Number(item.price).toFixed(2)}</td>
                    <td>
                      <button className="add-to-cart" onClick={() => addItem(item.name, item.price, 1)}>
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}

            {entrees.length > 0 && (
              <>
                <tr>
                  <th colSpan="3">Entrees</th>
                </tr>
                {entrees.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            style={{ width: 60, height: 40, objectFit: "cover", borderRadius: 6 }}
                          />
                        )}
                        <div>
                          <div style={{ fontWeight: 600 }}>{item.name}</div>
                          {item.description && <div style={{ fontSize: 12 }}>{item.description}</div>}
                        </div>
                      </div>
                    </td>
                    <td>${Number(item.price).toFixed(2)}</td>
                    <td>
                      <button className="add-to-cart" onClick={() => addItem(item.name, item.price, 1)}>
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}
