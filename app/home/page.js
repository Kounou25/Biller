"use client";
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    setUserEmail(email);
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Tableau de Bord</h1>
        {userEmail && <p style={styles.userGreeting}>Bienvenue, {userEmail}!</p>}
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}><a href="#" style={styles.navLink}>Accueil</a></li>
            <li style={styles.navItem}><a href="#" style={styles.navLink}>Générer un Reçu</a></li>
            <li style={styles.navItem}><a href="#" style={styles.navLink}>Mes Reçus</a></li>
            <li style={styles.navItem}><a href="#" style={styles.navLink}>Paramètres</a></li>
            <li style={styles.navItem}><a href="#" style={styles.navLink}>Déconnexion</a></li>
          </ul>
        </nav>
      </header>

      <main style={styles.main}>
        <section style={styles.cards}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Reçus Générés</h2>
            <p style={styles.cardValue}>45</p>
            <a href="#" style={styles.button}>Voir Détails</a>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Revenus Totaux</h2>
            <p style={styles.cardValue}>€3200</p>
            <a href="#" style={styles.button}>Voir Détails</a>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Utilisateurs Actifs</h2>
            <p style={styles.cardValue}>120</p>
            <a href="#" style={styles.button}>Voir Détails</a>
          </div>
        </section>

        <section style={styles.recentReceipts}>
          <h2 style={styles.receiptsTitle}>Reçus Récents</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Montant</th>
                <th style={styles.th}>Client</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.td}>001</td>
                <td style={styles.td}>2024-10-30</td>
                <td style={styles.td}>€50</td>
                <td style={styles.td}>Client A</td>
              </tr>
              <tr>
                <td style={styles.td}>002</td>
                <td style={styles.td}>2024-10-29</td>
                <td style={styles.td}>€75</td>
                <td style={styles.td}>Client B</td>
              </tr>
              <tr>
                <td style={styles.td}>003</td>
                <td style={styles.td}>2024-10-28</td>
                <td style={styles.td}>€100</td>
                <td style={styles.td}>Client C</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#181818',
    color: '#EAEAEA',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    backgroundColor: '#1E1E1E',
    padding: '20px',
    textAlign: 'center',
    borderBottom: '2px solid #333',
  },
  title: {
    marginBottom: '5px',
    fontSize: '2.5em',
    color: '#A3BE8C',
  },
  userGreeting: {
    marginBottom: '10px',
    fontSize: '1.2em',
    fontStyle: 'italic',
    color: '#B48EAD',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#A3BE8C',
    textDecoration: 'none',
    fontSize: '1.1em',
    transition: 'color 0.3s',
  },
  main: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    width: '100%',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#2E3440',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'transform 0.3s',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
  },
  cardTitle: {
    marginBottom: '10px',
    fontSize: '1.5em',
  },
  cardValue: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  recentReceipts: {
    backgroundColor: '#2E3440',
    borderRadius: '8px',
    padding: '20px',
    width: '100%',
    maxWidth: '800px',
  },
  receiptsTitle: {
    marginBottom: '15px',
    fontSize: '1.5em',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '10px',
    backgroundColor: '#5E81AC',
    color: '#EAEAEA',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #4C566A',
  },
  button: {
    backgroundColor: '#5E81AC',
    color: '#EAEAEA',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    display: 'inline-block',
  },
};
