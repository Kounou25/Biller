// app/api/register/route.js
import { supabase } from '../../../lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { nom, email, pays, tel, company, mbp, mbpverify } = await req.json();

  // Vérification des champs
  if (!nom || !email || !pays || !tel || !company || !mbp || !mbpverify) {
    return new Response(
      JSON.stringify({ message: 'Tous les champs sont requis.' }),
      { status: 400 }
    );
  }
   let hashedPassword=null;
  //verification de la compatibilite des deux champs de mot de passe

  if (mbp != mbpverify) {
    return new Response(
      JSON.stringify({ message: 'les deux mots de passe sont differents' }),
      { status: 500 }
    );    
    
  }else{
      // Cryptage du mot de passe
   hashedPassword = await bcrypt.hash(mbp, 10);
  }



  // Insertion de l'utilisateur dans la base de données
  const { data, error } = await supabase
    .from('users') // Remplacez 'users' par le nom de votre table dans Supabase
    .insert([
      {
        nom,
        email,
        pays,
        tel,
        company,
        mbp: hashedPassword,
      },
    ])
    .select(); // Ajout de .select() pour récupérer les données insérées

  if (error) {

    if (error.message=='duplicate key value violates unique constraint "users_tel_key"') {
      return new Response(JSON.stringify({ message: "Désolé ! ce numéro de téléphone est deja utiliser !" }), { 
        status: 500,
      });
      
    }else if(error.message=='duplicate key value violates unique constraint "users_email_key"'){
      return new Response(JSON.stringify({ message: "Désolé ! cet adresse email est deja utiliser !" }), { 
        status: 500,
      });
    }

  }

  // Récupération de l'ID de l'utilisateur inséré
  const userId = data[0].id; // Supposant que la colonne ID est nommée 'id'

  return new Response(
    JSON.stringify({ message: 'Inscription réussie.', user: { id: userId, email } }), // On retourne l'ID et l'email
    { status: 200 }
  );
}
