'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importation du router
import { paysList } from '../../app/staticData/countries.js';

export default function Register() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [pays, setPays] = useState('');
  const [tel, setTel] = useState('');
  const [mbp, setPassword] = useState('');
  const [mbpverify, setPasswordVerify] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // État pour le chargement
  const [popup, setPopup] = useState(null); // État pour afficher un popup
  const router = useRouter(); // Initialisation du router

  const handleCountryChange = (e) => {
    const selectedCountry = paysList.find((p) => p.nom === e.target.value);
    setPays(selectedCountry.nom);
    setTel(`${selectedCountry.indicatif} `); // Mise à jour de l'indicatif téléphonique
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Activation de l'état de chargement
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email, pays, tel, company, mbp, mbpverify }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('userId', data.user.id); // Stockage de l'ID de l'utilisateur
      localStorage.setItem('userEmail', data.user.email);
      setPopup({ type: 'success', message: 'Inscription réussie ! Redirection en cours...' });
      setTimeout(() => router.push('/customize'), 1500); // Redirection vers la page de personnalisation
    } else {
      setPopup({ type: 'error', message: data.message });
    }
    setLoading(false); // Désactivation de l'état de chargement
  };

  return (
    <div className="min-h-screen bg-gray-900 flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-gray-800 bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6">Inscription</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Nom complet"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <select
            value={pays}
            onChange={handleCountryChange}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="">Sélectionnez un pays</option>
            {paysList.map((pays) => (
              <option key={pays.nom} value={pays.nom}>
                {pays.nom}
              </option>
            ))}
          </select>
          <input
            type="tel"
            placeholder="Téléphone"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Entreprise"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            minLength={8}
            value={mbp}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Resaisir le mot de passe"
            minLength={8}
            value={mbpverify}
            onChange={(e) => setPasswordVerify(e.target.value)}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 mt-4 rounded-md text-white ${loading ? 'bg-blue-500 cursor-not-allowed' : 'bg-green-600 hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500'}`}
          >
            {loading ? 'Vérification...' : "S'inscrire"}
          </button>
        </form>

        {message && <p className="text-sm text-blue-400 mt-4">{message}</p>}

        {popup && (
          <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-4 rounded-md shadow-lg ${popup.type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white`}>
            <p>{popup.message}</p>
          </div>
        )}

        <div className="text-sm text-gray-400 mt-6">
          <p>J'ai déjà un compte. <a href="/login" className="text-green-500 hover:underline">Connectez-vous</a></p>
        </div>
        
        {/* Lien vers les CGU */}
        <div className="mt-4 text-center text-sm text-gray-400">
          <p>
            En vous inscrivant, vous acceptez nos <a href="/cgu" className="text-green-500 hover:underline">Conditions Générales d'Utilisation</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
