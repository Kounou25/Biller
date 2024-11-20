'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Importation du router

export default function Register() {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [pays, setPays] = useState('');
  const [tel, setTel] = useState('');
  const [mbp, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // État pour le chargement
  const [popup, setPopup] = useState(null); // État pour afficher un popup
  const router = useRouter(); // Initialisation du router

  // Liste des pays et indicatifs
  const paysList = [
    { nom: 'Niger', indicatif: '+227' },
    { nom: 'Sénégal', indicatif: '+221' },
    { nom: 'Côte d\'Ivoire', indicatif: '+225' },
    { nom: 'Mali', indicatif: '+223' },
    { nom: 'Burkina Faso', indicatif: '+226' },
    { nom: 'Ghana', indicatif: '+233' },
    { nom: 'Nigeria', indicatif: '+234' },
    { nom: 'Togo', indicatif: '+228' },
    { nom: 'Bénin', indicatif: '+229' },
    { nom: 'Cameroun', indicatif: '+237' },
  ];

  const handleCountryChange = (e) => {
    const selectedCountry = paysList.find((p) => p.nom === e.target.value);
    setPays(selectedCountry.nom);
    setTel(selectedCountry.indicatif); // Mise à jour de l'indicatif téléphonique
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Activation de l'état de chargement
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nom, email, pays, tel, company, mbp }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('userId', data.user.id); // Stockage de l'ID de l'utilisateur
      localStorage.setItem('userEmail', data.user.email);

      setPopup({ type: 'success', message: 'Inscription réussie ! Redirection en cours...' });
      setTimeout(() => router.push('/customize'), 1500); // Redirection vers la page de personnalisation
    } else {
      // Affiche le message d'erreur s'il y a une erreur
      setPopup({ type: 'error', message: data.message });
    }
    setLoading(false); // Désactivation de l'état de chargement
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <h2>Inscription</h2>
        <form onSubmit={handleRegister} className="form">
          <input
            type="text"
            placeholder="Nom complet"
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
          <select 
  value={pays} 
  onChange={handleCountryChange} 
  required 
  className="styled-select">
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
            minLength={8}
            value={mbp}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading} className={loading ? 'loading' : ''}>
            {loading ? 'Envoi...' : "S'inscrire"}
          </button>
        </form>

        {message && <p className="message">{message}</p>}
        
        {popup && (
          <div className={`popup ${popup.type}`}>
            <p>{popup.message}</p>
          </div>
        )}

        <div className="connect-message">
          <p>J'ai déjà un compte. <a href="/login">Connectez-vous</a></p>
        </div>
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

        .styled-select {
    background-color: #3c3c3c;
    border: none;
    border-radius: 5px;
    padding: 12px;
    margin: 8px 0;
    color: #ffffff;
    font-size: 16px;
    appearance: none; /* Supprime l'apparence par défaut du navigateur */
    cursor: pointer;
  }

  .styled-select::placeholder {
    color: #b0b0b0;
  }

  .styled-select option {
    background-color: #2b2b2b;
    color: #ffffff;
  }

  .styled-select:focus {
    outline: 2px solid #4caf50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
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
          background-color: #4caf50;
          color: #ffffff;
          border: none;
          border-radius: 5px;
          padding: 12px;
          font-size: 16px;
          cursor: pointer;
          margin-top: 10px;
          transition: background-color 0.3s, transform 0.3s;
        }

        .form button:hover {
          background-color: #357abd;
        }

        .form button.loading {
          background-color: #005bb5;
          cursor: not-allowed;
          transform: scale(1.05);
        }

        .message {
          margin-top: 20px;
          font-size: 14px;
          color: #4a90e2;
        }

        .popup {
          position: fixed;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: #28a745;
          color: white;
          padding: 10px;
          border-radius: 5px;
          box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          z-index: 1000;
        }

        .popup.error {
          background-color: #dc3545;
        }

        .connect-message {
          margin-top: 20px;
          font-size: 14px;
          color: #b0b0b0;
        }

        .connect-message a {
          color: #4caf50;
          text-decoration: none;
        }

        .connect-message a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
