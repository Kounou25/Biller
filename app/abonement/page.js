"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function AbonnementForm() {
  const [montant, setMontant] = useState("");
  const [duree, setDuree] = useState("0"); // 0 pour 1 mois, 1 pour 12 mois
  const [code, setCode] = useState("");
  const [abonnementActif, setAbonnementActif] = useState(null); // État pour l'abonnement actif
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const [message, setMessage] = useState({ text: "", type: "" }); // Message de succès ou d'erreur
  const router = useRouter();

  useEffect(() => {
    const abonnement = {
      montant: 5000,
      duree: 0,
      code: "CODE123",
    };
    setAbonnementActif(abonnement);
  }, []);

  useEffect(() => {
    // Ajuster le montant en fonction de la durée
    if (duree === "0") {
      setMontant("5000");
    } else if (duree === "1") {
      setMontant("39500");
    }
  }, [duree]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userId = localStorage.getItem("userId");
    const abonnementData = {
      montant: parseFloat(montant),
      duree: parseInt(duree),
      code,
      userId,
    };

    try {
      const response = await fetch("/api/abonnement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(abonnementData),
      });

      if (response.ok) {
        setMessage({ text: "Abonnement créé avec succès!", type: "success" });
        setTimeout(() => router.push("/home"), 1500);
      } else {
        setMessage({ text: "Erreur lors de la création de l’abonnement.", type: "error" });
      }
    } catch (error) {
      setMessage({ text: "Erreur lors de la communication avec le serveur.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-900 text-white rounded-md shadow-lg max-w-md mx-auto mt-16">
      <div
        className="flex items-center self-start text-green-400 text-sm cursor-pointer mb-6"
        onClick={() => router.push("/home")}
      >
        <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
        Retour à l'accueil
      </div>

      <h2 className="text-2xl font-bold mb-6">Souscrire à un abonnement</h2>

      {abonnementActif && (
        <div className="bg-green-800 border border-green-600 rounded-md p-4 mb-6 w-full">
          <h3 className="text-lg font-semibold mb-2">Abonnement Actif</h3>
          <p>Montant: {abonnementActif.montant} CFA</p>
          <p>Durée: {abonnementActif.duree === 0 ? "1 mois" : "1 an"}</p>
          <p>Code: {abonnementActif.code}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <label className="text-sm font-semibold">
          Durée :
          <select
            value={duree}
            onChange={(e) => setDuree(e.target.value)}
            required
            className="w-full mt-2 p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring focus:ring-green-400"
          >
            <option value="0">1 mois</option>
            <option value="1">1 an</option>
          </select>
        </label>

        <label className="text-sm font-semibold">
          Montant :
          <select
            value={montant}
            disabled
            required
            className="w-full mt-2 p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-400 cursor-not-allowed"
          >
            <option value="5000">5000 CFA</option>
            <option value="39500">39500 CFA</option>
          </select>
        </label>

        <label className="text-sm font-semibold">
          Code d'envoi :
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            maxLength="35"
            placeholder="Entrez votre code"
            className="w-full mt-2 p-2 rounded-md bg-gray-800 border border-gray-700 focus:ring focus:ring-green-400 placeholder-gray-500"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md font-bold ${
            loading ? "bg-gray-700" : "bg-green-500 hover:bg-green-600"
          } text-white transition`}
        >
          {loading ? "Souscription en cours..." : "Souscrire"}
        </button>
      </form>

      {message.text && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 p-3 rounded-md text-white text-sm font-bold ${
            message.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
