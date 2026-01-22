"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Construction, ShoppingBag } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

export default function StorePage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-black relative overflow-hidden">
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

      <div className="w-full max-w-2xl relative z-10">
        <SpotlightCard className="p-12 text-center border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 mx-auto bg-zinc-800 rounded-full flex items-center justify-center mb-8 border border-zinc-700 shadow-xl"
          >
            <ShoppingBag className="text-zinc-400" size={32} />
            <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black p-2 rounded-full border-4 border-zinc-900">
                <Construction size={16} strokeWidth={3} />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Store Coming Soon
            </h1>
            <p className="text-lg text-zinc-400 mb-8 max-w-md mx-auto leading-relaxed">
              We are currently finalizing our payment gateway integration with <span className="text-white font-semibold">Lemon Squeezy</span>. The digital asset store will be live shortly.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
              >
                <ArrowLeft size={18} />
                Back to Home
              </Link>
              
              <Link 
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-zinc-800 transition-all"
              >
                Browse Portfolio
              </Link>
            </div>
          </motion.div>

        </SpotlightCard>

        {/* Status Badge */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex justify-center"
        >
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-xs font-medium uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse" />
                Awaiting Verification
            </span>
        </motion.div>
      </div>
    </main>
  );
}