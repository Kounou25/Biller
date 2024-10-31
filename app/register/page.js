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
    setMessage(data.message);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Inscription</h2>
      <form onSubmit={handleRegister} style={styles.form}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Pays"
          value={pays}
          onChange={(e) => setPays(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="tel"
          placeholder="Téléphone"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Entreprise"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={mbp}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>S'inscrire</button>
      </form>
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    margin: '8px 0',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '12px',
    marginTop: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#005bb5',
  },
  message: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#0070f3',
  },
};
