'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupVisible, setPopupVisible] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPopupMessage('Connexion en cours...');
    setPopupVisible(true);

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (response.ok) {
      // Stocker l'ID et l'email dans localStorage
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('userEmail', data.user.email);
      localStorage.setItem('userName', data.user.nom);
      setPopupMessage('Connexion réussie!');
      setTimeout(() => {
        setPopupVisible(false);
        router.push('/home'); // Redirection avec router
      }, 3000);
    } else {
      setMessage(data.message || 'Une erreur est survenue.');
      setPopupMessage('Erreur de connexion');
      setTimeout(() => setPopupVisible(false), 3000);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md text-white">
        <h2 className="text-3xl text-center mb-6">Connexion</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 text-lg rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 text-lg rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="p-3 text-lg rounded-md bg-green-500 text-white hover:bg-green-400 disabled:bg-gray-500 transition-colors"
          >
            {loading ? (
              <div className="border-4 border-white border-t-transparent rounded-full w-6 h-6 animate-spin mx-auto"></div>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}

        {/* Lien pour créer un compte */}
        <p className="text-center text-gray-400 mt-4">
          Pas encore inscrit ? <a href="/register" className="text-green-500 hover:underline">Créer un compte</a>
        </p>
      </div>

      {popupVisible && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white py-2 px-4 rounded-md shadow-lg animate-slideIn">
          <p>{popupMessage}</p>
        </div>
      )}
    </div>
  );
}
