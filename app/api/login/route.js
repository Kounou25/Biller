// app/api/login/route.js
import { supabase } from '../../../lib/supabaseClient';
import bcrypt from 'bcrypt';

export async function POST(req) {
  const { nom,email,pays,phone,company, mpb } = await req.json();

  if (!email || !mbp) {
    return new Response(JSON.stringify({ message: 'Email et mot de passe requis.' }), { status: 400 });
  }

  // Récupération de l'utilisateur
  const { data, error } = await supabase
    .from('users')
    .select('id, email, mbp')
    .eq('email', email)
    .single();

  if (error || !data) {
    return new Response(JSON.stringify({ message: 'Utilisateur non trouvé.' }), { status: 404 });
  }

  // Vérification du mot de passe
  const isPasswordCorrect = await bcrypt.compare(mbp, data.password);

  if (!isPasswordCorrect) {
    return new Response(JSON.stringify({ message: 'Mot de passe incorrect.' }), { status: 401 });
  }

  return new Response(JSON.stringify({ message: 'Connexion réussie.' }), { status: 200 });
}
