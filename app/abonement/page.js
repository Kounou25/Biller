"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export default function AbonnementForm() {
  const [montant, setMontant] = useState('');
  const [duree, setDuree] = useState('0'); // 0 pour 1 mois, 1 pour 12 mois
  const [code, setCode] = useState('');
  const [abonnementActif, setAbonnementActif] = useState(null); // État pour l'abonnement actif
  const router = useRouter();

  // Simuler la récupération d'un abonnement actif (normalement, cela viendrait d'une API)
  useEffect(() => {
    // Remplacez cette partie par votre logique d'API pour récupérer l'abonnement actif
    const abonnement = {
      montant: 5000,
      duree: 0,
      code: 'CODE123',
    };
    setAbonnementActif(abonnement);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const abonnementData = {
      montant: parseFloat(montant),
      duree: parseInt(duree),
      code,
    };

    const response = await fetch('/api/abonnement', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(abonnementData),
    });

    if (response.ok) {
      alert('Abonnement créé avec succès!');
      router.push('/dashboard'); // Redirection après succès
    } else {
      alert('Erreur lors de la création de l’abonnement.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backButton} onClick={() => router.push('/home')}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ marginRight: '8px' }} />
        Retour à l'accueil
      </div>
      
      <h2 style={styles.title}>Souscrire à un abonnement</h2>
      
      {/* Afficher les informations de l'abonnement actif si disponibles */}
      {abonnementActif && (
        <div style={styles.abonnementActif}>
          <h3 style={styles.abonnementTitle}>Abonnement Actif</h3>
          <p>Montant: {abonnementActif.montant} CFA</p>
          <p>Durée: {abonnementActif.duree === 0 ? '1 mois' : '1 an'}</p>
          <p>Code: {abonnementActif.code}</p>
        </div>
      )}

      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Montant :
            <select
              value={montant}
              onChange={(e) => setMontant(e.target.value)}
              required
              style={styles.select}
            >
              <option value="">Sélectionner le montant</option>
              <option value="5000">5000 CFA</option>
              <option value="39500">39500 CFA</option>
            </select>
          </label>

          <label style={styles.label}>
            Durée :
            <select
              value={duree}
              onChange={(e) => setDuree(e.target.value)}
              required
              style={styles.select}
            >
              <option value="0">1 mois</option>
              <option value="1">1 an</option>
            </select>
          </label>

          <label style={styles.label}>
            Code :
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              maxLength="35"
              placeholder="Entrez votre code"
              style={styles.input}
            />
          </label>

          <button type="submit" style={styles.button}>Souscrire</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    margin: 'auto',
    marginTop: '50px',
  },
  backButton: {
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    color: '#007bff',
    fontSize: '16px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  abonnementActif: {
    backgroundColor: '#e9f7ef',
    border: '1px solid #c3e6cb',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '20px',
    width: '100%',
  },
  abonnementTitle: {
    fontSize: '18px',
    color: '#155724',
    marginBottom: '10px',
  },
  formContainer: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '15px',
    fontWeight: 'bold',
    color: '#555',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
    fontSize: '16px',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
    fontSize: '16px',
    backgroundColor: '#fff',
    color: '#333',
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px',
    transition: 'background-color 0.3s',
  },
};
