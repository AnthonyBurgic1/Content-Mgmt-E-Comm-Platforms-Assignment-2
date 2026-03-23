// Scenario 1: Bookstore \\

// Run: npx create-next-app@latest bookstore-app \\
// Replace /app/page.js and create supporting files as below \\


// /app/page.js (Home Page) \\

export default function Home() {
  return (
    <main style={{ padding: 20 }}>
      <h1>📚 Bookstore</h1>
      <p>Welcome to our online shop.</p>
      <a href="/products">View Products</a>
    </main>
  );
}

// /app/products/page.js \\

const products = [
  { id: 1, name: "Digital Book", price: 10, type: "digital" },
  { id: 2, name: "Physical Book", price: 20, type: "physical" }
];

export default function Products() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p.id} style={{ marginBottom: 10 }}>
          <h3>{p.name}</h3>
          <p>${p.price}</p>
          <a href={`/products/${p.id}`}>View</a>
        </div>
      ))}
    </div>
  );
}


// /app/products/[id]/page.js \\

import { useState } from "react";

const productsData = {
  1: { id: 1, name: "Digital Book", price: 10, type: "digital" },
  2: { id: 2, name: "Physical Book", price: 20, type: "physical" }
};

export default function ProductPage({ params }) {
  const product = productsData[params.id];

  const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{product.name}</h2>
      <p>Price: ${product.price}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}


// /app/cart/page.js \\

"use client";
import { useEffect, useState } from "react";

export default function Cart() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(data);
  }, []);

  const checkout = () => {
    localStorage.setItem("downloadUsed", "false");
    localStorage.removeItem("cart");
    window.location.href = "/success";
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Your Cart</h2>
      {cart.map((item, i) => (
        <div key={i}>{item.name}</div>
      ))}
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}


// /app/success/page.js \\

"use client";
import { useState, useEffect } from "react";

export default function Success() {
  const [downloadUsed, setDownloadUsed] = useState(true);

  useEffect(() => {
    const used = localStorage.getItem("downloadUsed") === "true";
    setDownloadUsed(used);
  }, []);

  const handleDownload = () => {
    if (!downloadUsed) {
      alert("Downloading book...");
      localStorage.setItem("downloadUsed", "true");
      setDownloadUsed(true);
    } else {
      alert("Download already used!");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Order Successful!</h2>
      <button onClick={handleDownload} disabled={downloadUsed}>
        Download Digital Book
      </button>
      <p>Physical books will be shipped to your address.</p>
    </div>
  );
}


// Notes: \\

// - Uses localStorage as a fake backend
// - Digital download is limited to ONE time
// - Physical product shows shipping message
// - You can expand with database + authentication later
