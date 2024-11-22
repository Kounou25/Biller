"use client";

import React from "react";

export default function CGUPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-gray-200 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-[#4caf50] mb-12">
          Conditions Générales d'Utilisation (CGU)
        </h1>

        <p className="text-center text-lg text-gray-400 mb-12">
          Bienvenue sur <span className="font-bold text-[#4caf50]">Tikita</span>, l'application qui vous permet de générer des reçus 100% personnalisables rapidement et efficacement. Ces CGU décrivent les conditions et limites d'utilisation de notre service.
        </p>

        {/* Section 1: Introduction */}
        <section className="mb-12 border-b border-gray-700 pb-8">
          <h2 className="text-3xl font-bold text-[#4caf50] mb-6">1. Introduction</h2>
          <p className="text-lg leading-8">
            Tikita est conçue pour aider les vendeurs en ligne, particulièrement ceux du secteur informel, à générer des reçus professionnels et personnalisables pour leurs clients. Notre objectif est de simplifier la gestion commerciale tout en offrant une flexibilité totale pour adapter vos reçus à vos besoins.
          </p>
          <p className="mt-4 text-gray-400">
            <strong>Important :</strong> L'utilisation de Tikita est soumise à ces conditions. Veuillez les lire attentivement avant d'utiliser notre application.
          </p>
        </section>

        {/* Section 2: Acceptation */}
        <section className="mb-12 border-b border-gray-700 pb-8">
          <h2 className="text-3xl font-bold text-[#4caf50] mb-6">2. Acceptation des Conditions</h2>
          <p className="text-lg leading-8">
            En créant un compte et en utilisant Tikita, vous acceptez automatiquement les présentes CGU. Si vous ne les acceptez pas, nous vous recommandons de cesser immédiatement l'utilisation de nos services.
          </p>
          <ul className="list-disc list-inside text-lg mt-6">
            <li>Les CGU peuvent être modifiées à tout moment pour répondre aux exigences légales ou aux évolutions de l'application.</li>
            <li>Vous serez informé des changements via email ou notification sur l'application.</li>
          </ul>
        </section>

        {/* Section 3: Utilisation */}
        <section className="mb-12 border-b border-gray-700 pb-8">
          <h2 className="text-3xl font-bold text-[#4caf50] mb-6">3. Utilisation de Tikita</h2>
          <p className="text-lg leading-8">
            Tikita offre des outils intuitifs pour :
          </p>
          <ul className="list-disc list-inside text-lg mt-6 space-y-4">
            <li>Créer des reçus personnalisés avec les logos, couleurs et textes de votre choix.</li>
            <li>Partager les reçus directement par email ou sous forme de fichiers PDF.</li>
            <li>Gérer un historique sécurisé de vos reçus pour un suivi optimal.</li>
          </ul>
          <p className="mt-6 text-lg">
            <strong>Rappel :</strong> Tikita n'est pas responsable de l'authenticité ou de la véracité des informations que vous fournissez lors de la création de vos reçus.
          </p>
        </section>

        {/* Section 4: Données personnelles */}
        <section className="mb-12 border-b border-gray-700 pb-8">
          <h2 className="text-3xl font-bold text-[#4caf50] mb-6">4. Protection des Données Personnelles</h2>
          <p className="text-lg leading-8">
            Nous respectons votre vie privée et nous engageons à protéger vos données personnelles. Les informations collectées sont strictement limitées à :
          </p>
          <ul className="list-disc list-inside text-lg mt-6 space-y-4">
            <li>Votre adresse email (pour la gestion de votre compte).</li>
            <li>Vos préférences de personnalisation pour les reçus.</li>
            <li>Les reçus générés (stockés uniquement si vous le souhaitez).</li>
          </ul>
          <p className="mt-6 text-lg">
            Pour plus de détails, consultez notre <span className="text-[#4caf50] underline cursor-pointer">Politique de Confidentialité</span>.
          </p>
        </section>

        {/* Section 5: Responsabilités */}
        <section className="mb-12 border-b border-gray-700 pb-8">
          <h2 className="text-3xl font-bold text-[#4caf50] mb-6">5. Responsabilités</h2>
          <p className="text-lg leading-8">
            Tikita met à votre disposition un service fiable et sécurisé, mais :
          </p>
          <ul className="list-disc list-inside text-lg mt-6 space-y-4">
            <li>Nous ne garantissons pas la conformité légale des reçus générés. Veuillez vérifier auprès des autorités compétentes.</li>
            <li>Nous ne sommes pas responsables des pertes de données dues à une mauvaise utilisation ou des pannes techniques indépendantes de notre volonté.</li>
          </ul>
        </section>

        {/* Section 6: Clause légale */}
        <section className="mb-12 border-b border-gray-700 pb-8">
          <h2 className="text-3xl font-bold text-[#4caf50] mb-6">6. Clause Légale</h2>
          <p className="text-lg leading-8">
            Tikita n'est en aucun cas responsable si ses services sont utilisés à des fins illégales. 
            Chaque utilisateur est seul responsable de ses actions et des documents générés via la plateforme.
          </p>
        </section>

        {/* Section 7: Contact */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-[#4caf50] mb-6">7. Contact</h2>
          <p className="text-lg leading-8">
            Pour toute question ou demande d'assistance, contactez-nous à :{" "}
            <span className="text-[#4caf50] underline cursor-pointer">support@tikita.com</span>.
          </p>
        </section>

        <footer className="text-center mt-12">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Tikita - Tous droits réservés.
          </p>
        </footer>
      </div>
    </div>
  );
}
