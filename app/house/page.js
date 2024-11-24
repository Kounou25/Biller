"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push('/register');
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-6 sm:px-10 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-gray-900 to-gray-800 opacity-40 blur-2xl"></div>

      {/* Floating Glow Effect */}
      <div className="absolute -top-10 -left-20 w-80 h-80 bg-green-500 rounded-full opacity-30 animate-pulse"></div>
      <div className="absolute -bottom-10 -right-20 w-96 h-96 bg-gray-700 rounded-full opacity-20 animate-pulse"></div>

      {/* Title Section */}
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Bienvenue sur <span className="text-green-500">Tikita</span>
      </motion.h1>

      {/* Description Section */}
      <motion.p
        className="text-base sm:text-lg lg:text-xl text-gray-300 text-center max-w-xl sm:max-w-2xl mb-10 z-10 leading-relaxed"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        Avec Tikita, créez instantanément des reçus personnalisés en toute simplicité ! Conçue pour les vendeurs en ligne et les auto-entrepreneurs, Tikita vous permet de générer vos reçus en un clin d'œil, de manière rapide, intuitive et 100 % personnalisable.
      </motion.p>

      {/* Buttons Section */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      >
        <motion.button
          className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white bg-green-500 rounded-lg shadow-lg hover:bg-green-600 transition transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          onClick={handleSignUp}
        >
          S'inscrire
        </motion.button>

        <motion.button
          className="px-6 sm:px-8 py-3 text-base sm:text-lg font-semibold text-white bg-gray-700 rounded-lg shadow-lg hover:bg-gray-600 transition transform hover:scale-105"
          whileHover={{ scale: 1.1 }}
          onClick={handleLogin}
        >
          Se connecter
        </motion.button>
      </motion.div>

      {/* Footer Section */}
      <motion.footer
        className="absolute bottom-4 w-full text-center text-gray-400 text-sm z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.6 }}
      >
        &copy; {new Date().getFullYear()} Tikita. Tous droits réservés.
      </motion.footer>
    </div>
  );
}
