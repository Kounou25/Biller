'use client';
import { useState } from 'react';

export default function Home() {
  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // 'success' ou 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, email, items, userId })
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Tikita-pro recu ${customer}`;
      a.click();

      setPopupMessage('Reçu généré avec succès !');
      setPopupType('success');
    } catch (error) {
      setPopupMessage('Erreur lors de la génération du reçu.');
      setPopupType('error');
    } finally {
      setIsLoading(false);
      setTimeout(() => setPopupMessage(''), 3000); // Cache le popup après 3 secondes
    }
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: null, price: 0 }]);
  };

  return (
    <>
      <div className="form-container">
        <h1>TIKITA PRO</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nom du client"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Numero de telephone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {items.map((item, index) => (
            <div className="item" key={index}>
              <input
                type="text"
                placeholder=" description"
                value={item.description}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].description = e.target.value;
                  setItems(newItems);
                }}
              />
              <input
                type="number"
                placeholder="Quantite"
                value={item.quantity || ""}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].quantity = e.target.value;
                  setItems(newItems);
                }}
              />
              <input
                type="number"
                placeholder=" prix"
                value={item.price || ""}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].price = e.target.value;
                  setItems(newItems);
                }}
              />
            </div>
          ))}

          <button className="add-item-btn" type="button" onClick={addItem}>
            ajouter a la facture
          </button>
          <button className="submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? 'Chargement...' : 'Generer le recu'}
          </button>
        </form>

        {/* Popup de message */}
        {popupMessage && (
          <div className={`popup ${popupType}`}>
            {popupMessage}
          </div>
        )}
      </div>

      <footer>
        <p><strong>TIKITA PRO V1</strong></p>
        <p>Créée avec ❤️ par <a href="https://wa.me/22788715276" target="_blank">Kounou Gilbert</a></p>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

        .form-container {
          max-width: 600px;
          margin: 60px auto;
          padding: 30px;
          background: white;
          border-radius: 16px;
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          font-family: 'Inter', sans-serif;
          color: black;
          position: relative;
        }

        h1 {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        input, .add-item-btn, .submit-btn {
          width: 100%;
          padding: 14px;
          margin-bottom: 20px;
          border-radius: 8px;
          font-size: 1rem;
          background: rgba(0, 0, 0, 0.05);
          color: black;
          border: 1px solid #ccc;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        input:focus {
          background: rgba(0, 0, 0, 0.1);
          box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
          outline: none;
        }

        .item {
          display: flex;
          gap: 15px;
        }

        .item input {
          flex: 1;
        }

        .add-item-btn {
          background-color: #ff9800;
          color: white;
          border: none;
          cursor: pointer;
        }

        .submit-btn {
          background-color: #2196f3;
          color: white;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
        }

        .popup {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          padding: 15px 20px;
          border-radius: 8px;
          color: white;
          font-weight: 600;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          animation: fadeInOut 3s ease;
        }

        .popup.success {
          background-color: #4caf50;
        }

        .popup.error {
          background-color: #f44336;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          10%, 90% { opacity: 1; }
        }

        footer {
          text-align: center;
          padding: 20px;
          color: white;
          margin-top: 40px;
        }

        footer p {
          margin: 0;
        }

        footer a {
          color: #2196f3;
          text-decoration: none;
        }

        @media (max-width: 600px) {
          .item {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
