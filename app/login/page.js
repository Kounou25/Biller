// app/login/page.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

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
      router.push('/home'); // Redirection avec router
    } else {
      setMessage(data.message || 'Une erreur est survenue.');
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
            {loading ? 'Chargement...' : 'Se connecter'}
          </button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

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
      `}</style>
    </div>
  );
}
