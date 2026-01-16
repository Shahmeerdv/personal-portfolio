"use client"; 
import Link from "next/link";
import { Palette, ChevronLeft } from "lucide-react";
import SoftwareShowcase from "@/components/SoftwareShowcase";
import { motion } from "framer-motion"; 

export default function SoftwarePage() {
    return (
        <main className="min-h-screen pt-32 pb-20 ">

            {/* --- HEADER SECTION --- */}
            <div className="relative max-w-7xl mx-auto px-4 mb-4 text-center">

                {/* Back to Home (Desktop Only) */}
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
                    className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight"
                >
                    CODE ARCHIVE
                </motion.h1>

                {/* 👇 OPTIMIZED SUBTITLE */}
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-zinc-400 mb-8 max-w-2xl mx-auto"
                >
                    A selection of software projects and open-source contributions.
                </motion.p>

                {/* --- CROSS-LINK BUTTON --- */}
                <div className="flex justify-center mb-8">
                    <Link
                        href="/graphics"
                        className="group flex flex-row items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-emerald-500/50 transition-all duration-300"
                    >
                        <div className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                            <Palette size={18} />
                        </div>
                        <span className="text-sm font-bold text-white tracking-wide">
                            View Graphics Projects
                        </span>
                    </Link>
                </div>

            </div>

            <div className="-mt-10">
                <SoftwareShowcase showTitle={false} />
            </div>

        </main>
    );
}