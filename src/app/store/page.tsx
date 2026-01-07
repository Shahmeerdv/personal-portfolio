"use client";
import { motion } from "framer-motion";
import { Construction } from "lucide-react";

export default function StorePage() {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-black text-white px-4 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="space-y-6"
      >
        <div className="mx-auto w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">
           <Construction size={40} className="text-yellow-500" />
        </div>
        <h1 className="text-4xl font-bold">Store Opening Soon</h1>
        <p className="text-zinc-500 max-w-md mx-auto">
          I am currently curating a collection of premium design assets and UI kits. 
          Check back later.
        </p>
        <button 
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-2 bg-white text-black rounded-full font-medium hover:bg-zinc-200 transition-colors"
        >
          Go Back
        </button>
      </motion.div>
    </main>
  );
}