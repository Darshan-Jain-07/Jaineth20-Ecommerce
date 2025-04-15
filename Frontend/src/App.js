import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import women_banner from "./Components/Assets/banner_women.png";
import men_banner from "./Components/Assets/banner_mens.png";
import kid_banner from "./Components/Assets/banner_kids.png";
import LoginSignup from "./Pages/LoginSignup";
export const backend_url = 'http://localhost:4000';
export const currency = '₹';
function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const token = localStorage.getItem('token'); // Retrieve JWT token from localStorage
      try {
        console.log('Fetching products from backend...');
        
        const response = await fetch('http://localhost:3001/api/products', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        });
        
        console.log('Response received:', response);
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Products fetched:', data);
        setProducts(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
}


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Shop gender="all" />} />

          {/* Category Pages */}
          <Route path="/mens" element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path="/womens" element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path="/kids" element={<ShopCategory banner={kid_banner} category="kid" />} />

          {/* Product Page */}
          <Route path="/product/:productId" element={<Product />} />

          {/* Cart and Login Pages */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>

        {/* Footer */}
        <Footer />
      </Router>
    </div>
  );
}

export default App;
