// app/api/login/route.js
import { supabase } from '../../../lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { email, password } = await req.json();

  // Vérification des champs
  if (!email || !password) {
    return new Response(JSON.stringify({ message: 'Email et mot de passe requis.' }), { status: 400 });
  }

  // Récupération de l'utilisateur
  const { data, error } = await supabase
    .from('users')
    .select('id, email, mbp') // 'mbp' doit correspondre à la colonne de mot de passe dans votre table
    .eq('email', email)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ message: 'Utilisateur non trouvé.' }), { status: 404 });
  }

  // Vérification du mot de passe
  const isPasswordCorrect = await bcrypt.compare(password, data.mbp); // Vérifiez le mot de passe

  if (!isPasswordCorrect) {
    return new Response(JSON.stringify({ message: 'Mot de passe incorrect.' }), { status: 401 });
  }

  // Connexion réussie, on renvoie l'utilisateur
  return new Response(JSON.stringify({ message: 'Connexion réussie.', user: { id: data.id, email: data.email } }), { status: 200 });
}
