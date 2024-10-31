// app/api/register/route.js
import { supabase } from '../../../lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { nom,email,pays,phone,company, mpb } = await req.json();

  // Vérification des champs
  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email et mot de passe requis.' }), { status: 400 });
  }

  // Cryptage du mot de passe
  const hashedPassword = await bcrypt.hash(mpb, 10);

  // Insertion de l'utilisateur dans la base de données
  const { data, error } = await supabase
    .from('users') // Remplacez 'users' par le nom de votre table dans Supabase
    .insert([{ nom,email,pays,tel,company, mbp: hashedPassword }]);

  if (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }

  return new Response(JSON.stringify({ message: 'Inscription réussie.' }), { status: 200 });
}
