"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function CustomizeReceipt() {
  const [cmpName, setCmpName] = useState("");
  const [cmpTel, setCmpTel] = useState("");
  const [adresse, setAdresse] = useState("");
  const [slogan, setSlogan] = useState("");
  let [color, setColor] = useState("#690202"); // Initialiser avec une couleur par défaut
  const [logo, setLogo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
    }
  }, [router]);

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setLogo(file);
    } else {
      setError("Le format du fichier doit être .jpeg");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

    try {
      const { data: companyData, error: companyError } = await supabase
        .from("company")
        .insert([
          {
            cmpName,
            cmpTel,
            adresse,
            slogan,
            color,
            iduser: parseInt(userId),
          },
        ])
        .select();

      if (companyError) throw companyError;

      const companyId = companyData[0].idcmp;
      let logoUrl = "";
      if (logo) {
        const { data: logoData, error: logoError } = await supabase.storage
          .from("logos")
          .upload(`company-logos/${logo.name}`, logo);

        if (logoError) throw logoError;

        logoUrl = logoData.path;

        const { error: logoInsertError } = await supabase
          .from("logos")
          .insert([
            {
              url: logoUrl,
              iduser: parseInt(userId),
            },
          ]);

        if (logoInsertError) throw logoInsertError;
      } else if (!logo) {
        logoUrl = "company-logos/default.jpg";

        const { error: logoInsertError } = await supabase
          .from("logos")
          .insert([
            {
              url: logoUrl,
              iduser: parseInt(userId),
            },
          ]);

        if (logoInsertError) throw logoInsertError;
      }
      setMessage("Informations enregistrées avec succès !");
      setTimeout(() => router.push("/home"), 2000);
    } catch (error) {
      if (
        error.message ==
        'duplicate key value violates unique constraint "company_cmptel_key"'
      ) {
        const sms = "Ce numéro est déjà utilisé !";
        setError("Erreur lors de l'enregistrement des informations :" + sms);
      } else {
        setError(
          "Erreur lors de l'enregistrement des informations " + error.message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-t from-gray-800 to-black flex items-center justify-center">
      <div className="bg-gray-900 w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white mb-6">
          Personnalisez votre reçu
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Nom de l'entreprise
            </label>
            <input
              type="text"
              value={cmpName}
              onChange={(e) => setCmpName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none text-white bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Numéro de téléphone
            </label>
            <input
              type="text"
              value={cmpTel}
              minLength={8}
              onChange={(e) => setCmpTel(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none text-white bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Adresse
            </label>
            <input
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none text-white bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Slogan (facultatif)
            </label>
            <input
              type="text"
              value={slogan}
              onChange={(e) => setSlogan(e.target.value)}
              className="w-full px-4 py-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-600 focus:outline-none text-white bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Couleur principale
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full py-2 border border-gray-700 rounded-md focus:ring-2 focus:ring-green-600 text-white bg-gray-800"
              />
              <div
                className="w-8 h-8 border rounded-full"
                style={{ backgroundColor: color }}
              ></div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Logo (facultatif)
            </label>
            <input
              type="file"
              accept=".jpeg,.png,.jpg"
              onChange={handleLogoUpload}
              className="w-full text-gray-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md ${
              loading ? "bg-gray-600" : "bg-green-600 hover:bg-green-500"
            }`}
          >
            {loading ? "Chargement..." : "Enregistrer"}
          </button>
        </form>

        {message && (
          <div className="mt-4 text-green-600 text-center">{message}</div>
        )}
        {error && <div className="mt-4 text-red-600 text-center">{error}</div>}
      </div>
    </div>
  );
}
