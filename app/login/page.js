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
    <div className="container">
      <div className="form-wrapper">
        <h2>Connexion</h2>
        <form onSubmit={handleLogin} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? <div className="loader"></div> : 'Se connecter'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}

        {/* Ajout du lien pour la création d'un compte */}
        <p className="signup-link">
          Pas encore inscrit ? <a href="/register">Créer un compte</a>
        </p>
      </div>

      {popupVisible && (
        <div className="popup">
          <div className="popupContent">
            <p>{popupMessage}</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #1e1e1e;
          padding: 0 1rem;
          box-sizing: border-box;
        }
        .form-wrapper {
          background-color: #333;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          width: 100%;
          max-width: 400px;
          color: #ffffff;
        }
        h2 {
          text-align: center;
          margin-bottom: 1.5rem;
          font-size: 1.8rem;
          color: #ffffff;
        }
        .form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        input {
          padding: 0.8rem;
          font-size: 1rem;
          border: none;
          border-radius: 4px;
          background-color: #555;
          color: #ffffff;
        }
        input::placeholder {
          color: #cccccc;
        }
        button {
          padding: 0.8rem;
          font-size: 1rem;
          border: none;
          border-radius: 4px;
          background-color: #4caf50;
          color: #ffffff;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        button:hover {
          background-color: #45a049;
        }
        button:disabled {
          background-color: #777;
          cursor: not-allowed;
        }
        .message {
          margin-top: 1rem;
          text-align: center;
          color: #ff4d4d;
        }
        .popup {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #28a745; /* Changement pour un vert */
          color: #fff;
          padding: 10px 20px;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
          animation: popup 0.3s ease-out;
        }
        .popupContent {
          text-align: center;
          font-size: 16px;
        }
        .loader {
          border: 4px solid #fff;
          border-top: 4px solid transparent;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          animation: spin 1s linear infinite;
        }

        .signup-link {
          text-align: center;
          margin-top: 1rem;
          color: #ccc;
        }

        .signup-link a {
          color: #4caf50;
          text-decoration: none;
        }

        .signup-link a:hover {
          text-decoration: underline;
        }

        @keyframes popup {
          from {
            transform: translateX(-50%) translateY(-10px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
