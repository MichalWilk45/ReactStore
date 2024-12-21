import React, { useState } from 'react';
import './OrderSummary.css';

const OrderSummary = ({ cart }) => {
  const [paymentMethod, setPaymentMethod] = useState(''); // Stan metody płatności

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const handleConfirmOrder = () => {
    if (!paymentMethod) {
      alert('Wybierz metodę płatności przed złożeniem zamówienia.');
      return;
    }
    alert(`Zamówienie złożone! Wybrana metoda płatności: ${paymentMethod}`);
  };

  return (
    <div className="order-summary">
      <h2>Podsumowanie zamówienia</h2>
      {cart.length > 0 ? (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - {item.price} PLN
              </li>
            ))}
          </ul>
          <h3>Całkowity koszt: {totalPrice} PLN</h3>

          <div className="payment-method">
            <h3>Wybierz metodę płatności:</h3>
            <label>
              <input
                type="radio"
                name="payment"
                value="Płatność przy odbiorze"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Płatność przy odbiorze
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="Przelew bankowy"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Przelew bankowy
            </label>
          </div>

          <button onClick={handleConfirmOrder}>Potwierdź zamówienie</button>
        </>
      ) : (
        <p>Koszyk jest pusty.</p>
      )}
    </div>
  );
};

export default OrderSummary;
