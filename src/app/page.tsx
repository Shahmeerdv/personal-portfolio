import Link from "next/link";
import { Palette, Code } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";
import SoftwareShowcase from "@/components/SoftwareShowcase";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-32 pb-20 bg-black">
      
      {/* --- HERO SECTION --- */}
      <div className="text-center mb-20 px-4 max-w-4xl mx-auto">
        
        {/* Availability Badge */}
        <div className="inline-block mb-6 px-3 py-1 border border-zinc-800 rounded-full bg-zinc-900/50 backdrop-blur-md">
           <span className="text-[10px] md:text-xs text-emerald-400 font-bold uppercase tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             Available for Freelance
           </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter bg-linear-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent mb-6">
          VISUAL & CODE
        </h1>
        
        <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          A collection of high-performance software and avant-garde graphic design.
        </p>

        {/* --- NAVIGATION TILES (Bento Style Buttons) --- */}
        {/* --- NAVIGATION TILES (Rectangular & Compact) --- */}
        <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
          
          {/* Graphics Button */}
          <Link 
            href="/graphics" 
            className="group flex flex-row items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300"
          >
            <div className="p-1.5 rounded-full bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Palette size={18} />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">
              Graphics
            </span>
          </Link>

          {/* Software Button */}
          <Link 
            href="#software" 
            className="group flex flex-row items-center justify-center gap-2 px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300"
          >
            <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
              <Code size={18} />
            </div>
            <span className="text-sm font-bold text-white tracking-wide">
              Software
            </span>
          </Link>

        </div>
      </div>

      {/* --- 1. GRAPHICS SECTION (Teaser) --- */}
      {/* We keep the teaser here for people who just scroll naturally */}
      <div className="mb-24">
        <ProjectGallery isHome={true} />
      </div>
      
      {/* --- 2. SOFTWARE SECTION --- */}
      <div id="software" className="scroll-mt-24">
        <SoftwareShowcase />
      </div>
      
    </main>
  );
}