
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [nombreData, setNombreData] = useState(0);
  const [billingData, setBillingData] = useState([]);
  const [totalRecette, setTotalRecette] = useState(0);
  const [totalQuantity, setTotalQantity] = useState(0);


  useEffect(() => {
    // Récupérer les données côté client
    //recuperation d'id du user
    const userId = localStorage.getItem('userId');

    const fetchData = async () => {
      //recuperaation des donnees des recus
      const { data: billingData, error: billingError } = await supabase
        .from('bills')
        .select('*')
        .eq('iduser', userId);

        //recuperation des recettes total
        const { data: recetteData, error: recetteError } = await supabase
        .rpc('get_total_recette', { user_id: userId });

      if (!recetteError) setTotalRecette(recetteData || 0);

      //recuperation de la quantite total de produitd vendus
      const{data: quantityData, error: quantityError} = await supabase
       .rpc('total_quantity',{user_id: userId});

       if(!quantityError) setTotalQantity(quantityData || 0);
    

      //recuperation du nombre de recus generer
      const { data: nombreData, error: nombreError } = await supabase
        .from('bills')
        .select('*', { count: 'exact' })
        .eq('iduser', userId);
        console.log("nombre".nombreData);

        

      if (!billingError) setBillingData(billingData || []);
      if (!nombreError) setNombreData(nombreData?.length || 0);
    };

    fetchData();

    const email = localStorage.getItem('userEmail');
    setUserEmail(email);

    // Injecter les animations CSS côté client
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
    `;
    document.head.appendChild(styleSheet);

    // Nettoyage : supprimer le style à la sortie
    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Tableau de Bord</h1>
        {userEmail && <p style={styles.userGreeting}>Bienvenue, {userEmail}!</p>}
        <nav>
          <ul style={styles.navList}>
            <li style={styles.navItem}><a href="#" style={styles.navLink}>Accueil</a></li>
            <li style={styles.navItem}><a href="/facture" style={styles.navLink}>Générer un Reçu</a></li>
            <li style={styles.navItem}><a href="#" style={styles.navLink}>Mes Reçus</a></li>
            <li style={styles.navItem}><a href="#" style={styles.navLink}>Paramètres</a></li>
            <li style={styles.navItem}><a href="#" style={styles.logoutButton}>Déconnexion</a></li>
          </ul>
        </nav>
      </header>

      <main style={styles.main}>
        <section style={styles.cards}>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Reçus Générés</h2>
            <p style={styles.cardValue}>{nombreData}</p>
            <a href="#" style={styles.button}>Voir Détails</a>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Revenus Totaux</h2>
            <p style={styles.cardValue}>{totalRecette} FCA</p>
            <a href="#" style={styles.button}>Voir Détails</a>
          </div>
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>quantite vendues</h2>
            <p style={styles.cardValue}>{totalQuantity}</p>
            <a href="#" style={styles.button}>Voir Détails</a>
          </div>
        </section>

        <section style={styles.recentReceipts}>
          <h2 style={styles.receiptsTitle}>Reçus Récents</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>client</th>
                <th style={styles.th}>contact</th>
                <th style={styles.th}>Quantite</th>
                <th style={styles.th}>Montant T</th>
                <th style={styles.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {billingData.map((bill, index) => (
                <tr key={index}>
                  <td style={styles.td}>{bill.idbill}</td>
                  <td style={styles.td}>{bill.clientname}</td>
                  <td style={styles.td}>{bill.clienttel}</td>
                  <td style={styles.td}>{bill.quantity}</td>
                  <td style={styles.td}>{bill.total}</td>
                  <td style={styles.td}>{bill.created_at}</td>

                </tr>
              ))}
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
    backgroundColor: '#F3F4F6',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.5s ease',
  },
  header: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    textAlign: 'center',
    borderBottom: '2px solid #e5e7eb',
  },
  title: {
    marginBottom: '5px',
    fontSize: '2.2em',
    color: '#2563EB',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  userGreeting: {
    marginBottom: '10px',
    fontSize: '1.1em',
    fontStyle: 'italic',
    color: '#6B7280',
  },
  navList: {
    listStyleType: 'none',
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '15px',
    marginTop: '10px',
  },
  navItem: {
    margin: '0 10px',
  },
  navLink: {
    color: '#2563EB',
    textDecoration: 'none',
    fontSize: '1.1em',
    padding: '8px 16px',
    borderRadius: '5px',
    transition: 'all 0.3s ease',
    backgroundColor: '#E5E7EB',
  },
  navLinkHover: {
    '&:hover': {
      backgroundColor: '#2563EB',
      color: '#FFFFFF',
    },
  },
  main: {
    flex: 1,
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    width: '100%',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#FFFFFF',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center',
    transition: 'transform 0.3s',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  cardTitle: {
    marginBottom: '10px',
    fontSize: '1.4em',
    color: '#111827',
  },
  cardValue: {
    fontSize: '1.8em',
    fontWeight: 'bold',
    color: '#111827',
  },
  recentReceipts: {
    backgroundColor: '#FFFFFF',
    borderRadius: '8px',
    padding: '20px',
    width: '100%',
    maxWidth: '800px',
    animation: 'fadeIn 0.5s ease-in-out',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  receiptsTitle: {
    marginBottom: '15px',
    fontSize: '1.4em',
    color: '#111827',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    padding: '10px',
    backgroundColor: '#E5E7EB',
    color: '#111827',
    fontWeight: '600',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #E5E7EB',
  },

  logoutButton: {
    color: '#EAEAEA',
    backgroundColor: '#D32F2F',
    padding: '10px 20px',
    borderRadius: '5px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    '&:hover': {
      backgroundColor: '#B71C1C',
      transform: 'scale(1.05)',
    },
  },
  button: {
    backgroundColor: '#2563EB',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s, transform 0.2s',
    display: 'inline-block',
  },
  buttonHover: {
    '&:hover': {
      backgroundColor: '#1E3A8A',
      transform: 'translateY(-2px)',
    },
  },
  '@media (max-width: 768px)': {
    title: {
      fontSize: '1.8em',
    },
    navList: {
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
    },
    navLink: {
      padding: '10px 15px',
      fontSize: '1em',
    },
  },
};

