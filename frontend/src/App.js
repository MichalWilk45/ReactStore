import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './ProductList';
import OrderSummary from './OrderSummary';
import './App.css';

function App() {
  const [cart, setCart] = useState([]); // Stan koszyka wspólny dla całej aplikacji

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Sklep ReactJS</h1>
        </header>
        <main>
          <Routes>
            <Route
              path="/"
              element={<ProductList cart={cart} setCart={setCart} />}
            />
            <Route
              path="/order-summary"
              element={<OrderSummary cart={cart} />}
            />
          </Routes>
        </main>
        <footer className="App-footer">
          <p>© 2024 Sklep ReactJS. Wszelkie prawa zastrzeżone.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
