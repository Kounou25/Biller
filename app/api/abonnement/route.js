// /app/api/abonnement/route.js
import { supabase } from '@/lib/supabaseClient';

export async function POST(req) {
  try {
    const { montant, duree, code,userId } = await req.json();

    // Insertion dans la table abonnement
    const { data, error } = await supabase
      .from('abonnement')
      .insert([{ montant, duree, code,'iduser':userId }]);

    if (error) {
      throw new Error(error.message);
    }

    return new Response(JSON.stringify({ message: 'Abonnement créé avec succès !' }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
