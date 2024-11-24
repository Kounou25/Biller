'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: 1, price: 0 }]);
  const [isLoading, setIsLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState(''); // 'success' ou 'error'

  
    // Obtenir la date actuelle
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const userId = localStorage.getItem('userId');

    try {
      const response = await fetch('/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer, email, items, userId }),
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Tikita-pro recu ${customer}#${email}`;
      a.click();

      setPopupMessage('Reçu généré avec succès !');
      setPopupType('success');
    } catch (error) {
      setPopupMessage('Erreur lors de la génération du reçu.');
      setPopupType('error');
    } finally {
      setIsLoading(false);
      setTimeout(() => setPopupMessage(''), 3000);
    }
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center py-6 px-4">
        {/* Flèche de retour */}
        <button
          onClick={() => router.back()}
          className="absolute top-6 left-6 text-gray-300 hover:text-gray-100 text-lg flex items-center"
        >
          ← Retour
        </button>

        <h1 className="text-4xl font-extrabold mb-6">TIKITA PRO</h1>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl bg-gray-800 p-6 rounded-lg shadow-lg space-y-4"
        >
          <input
            type="text"
            placeholder="Nom du client"
            value={customer}
            onChange={(e) => setCustomer(e.target.value)}
            required
            className="w-full bg-gray-700 text-white rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            placeholder="Numéro de téléphone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-gray-700 text-white rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {items.map((item, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Description"
                value={item.description}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].description = e.target.value;
                  setItems(newItems);
                }}
                className="flex-1 bg-gray-700 text-white rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Quantité"
                value={item.quantity || ''}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].quantity = e.target.value;
                  setItems(newItems);
                }}
                className="flex-1 bg-gray-700 text-white rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                placeholder="Prix"
                value={item.price || ''}
                onChange={(e) => {
                  const newItems = [...items];
                  newItems[index].price = e.target.value;
                  setItems(newItems);
                }}
                className="flex-1 bg-gray-700 text-white rounded-lg p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-400 transition"
          >
            Ajouter à la facture
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full font-bold py-3 rounded-lg transition ${
              isLoading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-green-500 hover:bg-green-400'
            }`}
          >
            {isLoading ? 'Chargement...' : 'Générer le reçu'}
          </button>
        </form>

        {popupMessage && (
          <div
            className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg text-white font-bold shadow-lg ${
              popupType === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {popupMessage}
          </div>
        )}

        <footer className="mt-6 text-center">
          <p>
            <strong>TIKITA PRO 2.2</strong>
          </p>
          <p>
            Créée avec ❤️ par{' '}
            <a
              href="https://wa.me/22788715276"
              target="_blank"
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Urban Agency
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
