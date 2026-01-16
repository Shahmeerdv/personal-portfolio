"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Code, ChevronLeft, ArrowUp } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";
import { motion } from "framer-motion"; 

export default function GraphicsPage() {

  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen pt-32 pb-20 ">

      {/* Header Section */}
      <div className="relative max-w-7xl mx-auto px-4 mb-12 text-center">

        {/* Back to Home */}
        <div className="absolute left-4 top-2 hidden md:block z-50">
          <Link href="/" className="flex items-center gap-1 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
            <ChevronLeft size={16} /> Back
          </Link>
        </div>

        {/* 👇 OPTIMIZED: No Blur, Faster Duration */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-[9vw] md:text-5xl font-bold text-white mb-4 tracking-tight whitespace-nowrap"
        >
          GRAPHICS ARCHIVE
        </motion.h1>

        {/* 👇 OPTIMIZED SUBTITLE */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-zinc-400 mb-8"
        >
          Complete collection of commercial and personal works.
        </motion.p>

        {/* --- NAVIGATION BUTTON --- */}
        <div className="flex justify-center">
          <Link
            href="/software"
            className="group flex flex-row items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <Code size={18} />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">
              View Software Projects
            </span>
          </Link>
        </div>

      </div>

      <ProjectGallery isHome={false} />

      {/* Back to Top Button */}
      <div
        className={`fixed bottom-8 right-6 z-50 transition-all duration-500 transform ${showTopBtn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
          }`}
      >
        <button
          onClick={goToTop}
          className="p-3 bg-emerald-500 text-black rounded-full shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] active:scale-90 transition-all"
          aria-label="Back to Top"
        >
          <ArrowUp size={24} strokeWidth={2.5} />
        </button>
      </div>

    </main>
  );
}