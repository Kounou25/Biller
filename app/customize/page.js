// app/customize-receipt/page.js
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabaseClient';

export default function CustomizeReceipt() {
  const [cmpName, setCmpName] = useState('');
  const [cmpTel, setCmpTel] = useState('');
  const [adresse, setAdresse] = useState('');
  const [slogan, setSlogan] = useState('');
  const [color, setColor] = useState('');
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    setLogo(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Veuillez vous connecter pour continuer.');
      setLoading(false);
      return;
    }
  
    console.log('Données à insérer :', { cmpName, cmpTel, adresse, slogan,color, userId });
  
    try {
      // Insertion des informations de l'entreprise
      const { data: companyData, error: companyError } = await supabase
        .from('company')
        .insert([
          {
            cmpName,
            cmpTel,
            adresse,
            slogan,
            color,
            iduser: parseInt(userId), // ID de l'utilisateur comme clé étrangère
          },
        ])
        .select();
  
      if (companyError) {
        console.error('Erreur d\'insertion de l\'entreprise :', companyError);
        throw companyError;
      }
      const companyId = companyData[0].idcmp;
  
      // Upload du logo
      if (logo) {
        const { data: logoData, error: logoError } = await supabase
          .storage
          .from('logos')
          .upload(`company-logos/${logo.name}`, logo);
  
        if (logoError) {
          console.error('Erreur de téléchargement du logo :', logoError);
          throw logoError;
        }
        const logoUrl = logoData.path;
  
        // Insertion des informations du logo avec l'ID de l'utilisateur
        const { error: logoInsertError } = await supabase
          .from('logos')
          .insert([
            {
              url: logoUrl,
              iduser: parseInt(userId), // Ajout de l'ID de l'utilisateur
            },
          ]);
  
        if (logoInsertError) {
          console.error('Erreur d\'insertion du logo :', logoInsertError);
          throw logoInsertError;
        }
      }
  
      alert('Informations enregistrées avec succès !');
      router.push('/home');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement :', error);
      alert('Erreur lors de l\'enregistrement des informations : ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Personnalisez votre reçu</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Nom de l'entreprise :</label>
          <input 
            type="text" 
            value={cmpName} 
            onChange={(e) => setCmpName(e.target.value)} 
            required 
            style={styles.input} 
          />
          
          <label style={styles.label}>Numéro de l'entreprise :</label>
          <input 
            type="text" 
            value={cmpTel} 
            onChange={(e) => setCmpTel(e.target.value)} 
            required 
            style={styles.input} 
          />
          
          <label style={styles.label}>Adresse :</label>
          <input 
            type="text" 
            value={adresse} 
            onChange={(e) => setAdresse(e.target.value)} 
            required 
            style={styles.input} 
          />
          
          <label style={styles.label}>Slogan :</label>
          <input 
            type="text" 
            value={slogan} 
            onChange={(e) => setSlogan(e.target.value)} 
            style={styles.input} 
          />

<label style={styles.label}>Color :</label>
<input 
  type="color" 
  value={color} 
  onChange={(e) => setColor(e.target.value)} 
  style={{ ...styles.input, backgroundColor: color }} 
/>
          
          <label style={styles.label}>Logo :</label>
          <input 
            type="file" 
            onChange={handleLogoUpload} 
            style={styles.fileInput} 
          />
          
          <button type="submit" style={loading ? styles.loadingButton : styles.button}>
            {loading ? <div style={styles.loader}></div> : "Enregistrer"}
          </button>
        </form>
      </div>
    </div>
  );
}

// Styles ici...

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#121212',
    padding: '20px',
  },
  card: {
    maxWidth: '500px',
    width: '100%',
    backgroundColor: '#1e1e1e',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  label: {
    textAlign: 'left',
    fontSize: '16px',
    color: '#bbb',
    fontWeight: '500',
    marginBottom: '5px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #333',
    borderRadius: '4px',
    width: '100%',
    boxSizing: 'border-box',
    backgroundColor: '#2b2b2b',
    color: '#fff',
  },
  fileInput: {
    fontSize: '16px',
    color: '#bbb',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#0070f3',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  loadingButton: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    backgroundColor: '#005bb5',
    border: 'none',
    borderRadius: '4px',
    cursor: 'not-allowed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    border: '4px solid #0070f3',
    borderTop: '4px solid transparent',
    borderRadius: '50%',
    width: '18px',
    height: '18px',
    animation: 'spin 1s linear infinite',
  },
  '@keyframes spin': {
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' },
  },
};
