"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faFileInvoice,
  faReceipt,
  faCog,
  faSignOutAlt,
  faUserCircle,
  faClipboardList,
  faDollarSign,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

export default function Dashboard() {
  const [userEmail, setUserEmail] = useState("");
  const [nombreData, setNombreData] = useState(0);
  const [username, setUsername] = useState('');
  const [billingData, setBillingData] = useState([]);
  const [totalRecette, setTotalRecette] = useState(0);
  const [totalQuantity, setTotalQantity] = useState(0);
  const [subscriptionStatus, setSubscriptionStatus] = useState("");
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
    router.push("/login");
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push("/login");
      return;
    }

    const fetchData = async () => {
      const { data: billingData, error: billingError } = await supabase
        .from("bills")
        .select("*")
        .eq("iduser", userId)
        .order("created_at", { ascending: false }) // Tri par date, décroissant
        .limit(6);

        const { data: UsrData, error: ErrorUsr } = await supabase
        .from("users")
        .select("*")
        .eq("id", userId);

        if (!ErrorUsr && UsrData) {
          setUsername(UsrData[0]);
        }
      const { data: recetteData, error: recetteError } = await supabase
        .rpc("get_total_recette", { user_id: userId });

      if (!recetteError) setTotalRecette(recetteData || 0);

      const { data: quantityData, error: quantityError } = await supabase
        .rpc("total_quantity", { user_id: userId });

      if (!quantityError) setTotalQantity(quantityData || 0);

      const { data: nombreData, error: nombreError } = await supabase
        .from("bills")
        .select("*", { count: "exact" })
        .eq("iduser", userId)
        

      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from("users")
        .select("etat")
        .eq("userId", userId)
        .single();

      if (!subscriptionError && subscriptionData) {
        setSubscriptionStatus(subscriptionData.status);
      }

      if (!billingError) setBillingData(billingData || []);
      if (!nombreError) setNombreData(nombreData?.length || 0);
    };

    fetchData();
    const email = localStorage.getItem("userEmail");
    setUserEmail(email);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 bg-gray-900 p-6 space-y-6 rounded-lg shadow-lg">
          <div className="text-2xl font-bold text-green-400 mb-8">Dashboard</div>
          <nav className="space-y-6">
            <a
              href="/facture"
              className="flex items-center text-xl text-gray-300 hover:text-green-400 transition-all py-2 px-4 rounded-md"
            >
              <FontAwesomeIcon icon={faFileInvoice} className="mr-3 text-2xl" />
              Générer un Reçu
            </a>
            <a
              href="#"
              className="flex items-center text-xl text-gray-300 hover:text-green-400 transition-all py-2 px-4 rounded-md"
            >
              <FontAwesomeIcon icon={faReceipt} className="mr-3 text-2xl" />
              Mes Reçus
            </a>
            <a
              href="/abonement"
              className="flex items-center text-xl text-gray-300 hover:text-green-400 transition-all py-2 px-4 rounded-md"
            >
              <FontAwesomeIcon icon={faCog} className="mr-3 text-2xl" />
              Abonnement
            </a>
            <button
              onClick={logout}
              className="flex items-center text-xl text-white bg-red-600 hover:bg-red-500 transition-all py-2 px-4 rounded-md"
            >
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3 text-2xl" />
              Déconnexion
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-green-400">Bienvenue, {username.nom}!</h1>
            <p className="text-lg text-gray-400">Voici votre tableau de bord personnel</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform flex items-center space-x-4">
              <FontAwesomeIcon icon={faClipboardList} className="text-green-400 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-300">Reçus Générés</h2>
                <p className="text-4xl font-bold text-green-400">{nombreData}</p>
              </div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform flex items-center space-x-4">
              <FontAwesomeIcon icon={faDollarSign} className="text-green-400 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-300">Revenus Totaux</h2>
                <p className="text-4xl font-bold text-green-400">{totalRecette} FCA</p>
              </div>
            </div>
            <div className="bg-gray-900 p-6 rounded-lg shadow-xl hover:scale-105 transition-transform flex items-center space-x-4">
              <FontAwesomeIcon icon={faBoxOpen} className="text-green-400 text-3xl" />
              <div>
                <h2 className="text-2xl font-semibold text-gray-300">Quantité Vendue</h2>
                <p className="text-4xl font-bold text-green-400">{totalQuantity}</p>
              </div>
            </div>
          </div>

          {/* Recent Receipts Table */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Reçus Récents</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto text-gray-300">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Client</th>
                    <th className="py-3 px-4 text-left">Contact</th>
                    <th className="py-3 px-4 text-left">Quantité</th>
                    <th className="py-3 px-4 text-left">Montant T</th>
                    <th className="py-3 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {billingData.map((bill, index) => (
                    <tr key={index} className="hover:bg-gray-800 transition-all">
                      <td className="py-3 px-4">{bill.idbill}</td>
                      <td className="py-3 px-4">{bill.clientname}</td>
                      <td className="py-3 px-4">{bill.clienttel}</td>
                      <td className="py-3 px-4">{bill.quantity}</td>
                      <td className="py-3 px-4">{bill.total}</td>
                      <td className="py-3 px-4">{bill.created_at}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
