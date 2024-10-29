// app/under-construction/page.js
export default function UnderConstruction() {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>🚧 En cours de développement 🚧</h1>
          <p style={styles.text}>
            Cette application est actuellement en développement. Revenez bientôt pour en découvrir plus !
          </p>
          <div style={styles.infoContainer}>
            <p>Créé avec ❤️ par : Kounou Gilbert</p>
            <p>Whatsapp : +227 88715276</p>
            <p>Contact : kounougilbert288@gmail.com</p>
            <p>Localisation : Niamey, Niger</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Styles
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
      fontFamily: 'Arial, sans-serif',
    },
    card: {
      textAlign: 'center',
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: '400px',
      animation: 'fadeIn 1s ease-in-out',
    },
    title: {
      fontSize: '2rem',
      color: '#6a11cb',
      marginBottom: '1rem',
    },
    text: {
      fontSize: '1rem',
      color: '#333',
      marginBottom: '1.5rem',
    },
    infoContainer: {
      fontSize: '0.9rem',
      color: '#666',
      lineHeight: '1.6',
    },
  };
  