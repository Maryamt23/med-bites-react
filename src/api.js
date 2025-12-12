// src/api.js
import { API_BASE } from "./config";

export async function fetchMenu() {
  const res = await fetch(`${API_BASE}/api/menu`);
  if (!res.ok) throw new Error("Failed to fetch menu");
  return res.json();
}

export async function getCart(sessionId) {
  const res = await fetch(`${API_BASE}/api/cart/${sessionId}`);
  if (!res.ok) return [];
  return res.json();
}

export async function saveCart(sessionId, items) {
  const res = await fetch(`${API_BASE}/api/cart/${sessionId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items })
  });
  return res.json();
}

export async function placeOrder(orderData) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });
  if (!res.ok) throw new Error("Order failed");
  return res.json();
}
