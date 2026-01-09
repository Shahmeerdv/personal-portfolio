import Link from "next/link";
import { Palette, ChevronLeft } from "lucide-react"; 
import SoftwareShowcase from "@/components/SoftwareShowcase"; // Reusing your existing component

export default function SoftwarePage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-black">
      
      {/* --- HEADER SECTION --- */}
      <div className="relative max-w-7xl mx-auto px-4 mb-4 text-center">
        
        {/* Back to Home (Desktop Only) */}
        <div className="absolute left-4 top-2 hidden md:block">
            <Link href="/" className="flex items-center gap-1 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
                <ChevronLeft size={16} /> Back
            </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            CODE ARCHIVE
        </h1>
        <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            A selection of software projects and open-source contributions.
        </p>

        {/* --- CROSS-LINK BUTTON: Jump to Graphics --- */}
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

      {/* --- REUSING YOUR EXISTING COMPONENT --- */}
      {/* Since SoftwareShowcase has its own padding and max-width, 
          we wrap it in a div to negative-margin the top so it sits closer to the header
      */}
      <div className="-mt-20"> 
        <SoftwareShowcase />
      </div>
      
    </main>
  );
}