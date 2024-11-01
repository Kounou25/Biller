// app/api/register/route.js
import { supabase } from '../../../lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { nom, email, pays, tel, company, mbp } = await req.json();

  // Vérification des champs
  if (!nom || !email || !pays || !tel || !company || !mbp) {
    return new Response(
      JSON.stringify({ message: 'Tous les champs sont requis.' }),
      { status: 400 }
    );
  }

  // Cryptage du mot de passe
  const hashedPassword = await bcrypt.hash(mbp, 10);

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
    ]);

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), { 
      status: 500,
    });
  }

  return new Response(
    JSON.stringify({ message: 'Inscription réussie.' }),
    { status: 200 }
  );
}
