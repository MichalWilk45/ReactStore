import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = ({ cart, setCart }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const navigate = useNavigate(); // Hook do nawigacji

  useEffect(() => {
    // Pobieranie produktów
    axios
      .get('http://localhost:500/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error('Błąd przy pobieraniu produktów:', error));

    // Pobieranie kategorii
    axios
      .get('http://localhost:500/categories')
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Błąd przy pobieraniu kategorii:', error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const handlePlaceOrder = () => {
    navigate('/order-summary'); // Przejście do strony podsumowania zamówienia
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="product-container">
      <aside className="categories">
        <h2>Kategorie</h2>
        <ul>
          <li
            key="all"
            onClick={() => handleCategoryClick(null)}
            className={selectedCategory === null ? 'active' : ''}
          >
            Wszystkie
          </li>
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => handleCategoryClick(category)}
              className={selectedCategory === category ? 'active' : ''}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>
      <section className="products">
        <h2>Produkty</h2>
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <h3>{product.name}</h3>
              <p>Kategoria: {product.category}</p>
              <p>Cena: {product.price} PLN</p>
              <button onClick={() => handleAddToCart(product)}>
                Dodaj do koszyka
              </button>
            </div>
          ))}
        </div>
      </section>
      <aside className="cart">
        <h2>Koszyk</h2>
        {cart.length > 0 ? (
          <>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price} PLN
                </li>
              ))}
            </ul>
            <button className="place-order" onClick={handlePlaceOrder}>
              Złóż zamówienie
            </button>
          </>
        ) : (
          <p>Twój koszyk jest pusty.</p>
        )}
      </aside>
    </div>
  );
};

export default ProductList;
