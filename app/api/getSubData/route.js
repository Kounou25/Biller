import { supabase } from "@/lib/supabaseClient";

export async function GET(request) {
  const { searchParams } = new URL(request.url); // Récupération des paramètres de requête
  const userId = searchParams.get("userId"); // Extraction de userId

  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { data, error } = await supabase
    .from("abonnement")
    .select("*")
    .eq("iduser", userId)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ data }), {
    status: 200,
    
    headers: { "Content-Type": "application/json" },
  });
}
