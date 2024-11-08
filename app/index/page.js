// pages/index.js
"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/signup');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div style={styles.container}>
      <motion.h1 
        style={styles.title} 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Bienvenue sur <span style={styles.highlight}>Tikita</span>
      </motion.h1>
      
      <motion.p 
        style={styles.description}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Tikita vous simplifie la génération de reçus professionnels en un clic. Que vous soyez
        un freelance, une petite entreprise, ou tout autre créateur, Tikita vous offre une solution rapide et efficace.
      </motion.p>
      
      <motion.div 
        style={styles.buttonContainer}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <motion.button 
          style={styles.signUpButton} 
          whileHover={{ scale: 1.1, backgroundColor: '#45a049' }}
          onClick={handleSignUp}
        >
          S'inscrire
        </motion.button>
        
        <motion.button 
          style={styles.loginButton} 
          whileHover={{ scale: 1.1, backgroundColor: '#777777' }}
          onClick={handleLogin}
        >
          Se connecter
        </motion.button>
      </motion.div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#121212',
    color: '#FFFFFF',
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  highlight: {
    color: '#4CAF50',
  },
  description: {
    fontSize: '1.2rem',
    maxWidth: '600px',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '15px',
  },
  signUpButton: {
    padding: '12px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  loginButton: {
    padding: '12px 20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: '#FFFFFF',
    backgroundColor: '#555555',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};
