// app/register/page.js
'use client';
import { useState } from 'react';

export default function Register() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [pays, setPays] = useState('');
  const [tel, setTel] = useState('');
  const [mbp, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email, pays, tel, company, mbp }),
    });

    const data = await response.json();
    if (response.ok) {
        // Redirection vers la page de connexion en cas de succès
        window.location.href = '/login';
      } else {
        // Affiche le message d'erreur s'il y a une erreur
        setMessage(data.message);
      }
    
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Inscription</h2>
        <form onSubmit={handleRegister} className="form">
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Pays"
            value={pays}
            onChange={(e) => setPays(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Entreprise"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={mbp}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">S'inscrire</button>
        </form>
        {message && <p className="message">{message}</p>}
      </div>

      <style jsx>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          height: 100%;
          width: 100%;
          overflow-x: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #1e1e1e;
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100vh;
        }

        .form-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 400px;
          padding: 20px;
          background-color: #2b2b2b;
          border-radius: 8px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
        }

        h2 {
          font-size: 24px;
          margin-bottom: 20px;
          color: #ffffff;
        }

        .form {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .form input {
          background-color: #3c3c3c;
          border: none;
          border-radius: 5px;
          padding: 12px;
          margin: 8px 0;
          color: #ffffff;
          font-size: 16px;
        }

        .form input::placeholder {
          color: #b0b0b0;
        }

        .form button {
          background-color: #4a90e2;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          padding: 12px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s;
        }

        .form button:hover {
          background-color: #357abd;
        }

        .message {
          margin-top: 20px;
          font-size: 14px;
          color: #4a90e2;
        }
      `}</style>
    </div>
  );
}
