import Link from "next/link";
import { Code, ChevronLeft } from "lucide-react"; 
import ProjectGallery from "@/components/ProjectGallery";

export default function GraphicsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-black">
      
      {/* Header Section */}
      <div className="relative max-w-7xl mx-auto px-4 mb-12 text-center">
        
        {/* Back to Home (Desktop Only) */}
        <div className="absolute left-4 top-2 hidden md:block">
            <Link href="/" className="flex items-center gap-1 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
                <ChevronLeft size={16} /> Back
            </Link>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">THE ARCHIVE</h1>
        <p className="text-zinc-400 mb-8">Complete collection of commercial and personal works.</p>

        {/* --- NAVIGATION BUTTON: Jump to Software --- */}
        <div className="flex justify-center">
            <Link 
                href="/#software" 
                className="group flex flex-row items-center justify-center gap-2 px-5 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 hover:border-blue-500/50 transition-all duration-300"
            >
                {/* Blue Icon for Software */}
                <div className="p-1.5 rounded-full bg-blue-500/10 text-blue-400 group-hover:scale-110 transition-transform">
                    <Code size={18} />
                </div>
                <span className="text-sm font-bold text-white tracking-wide">
                    View Software Projects
                </span>
            </Link>
        </div>

      </div>

      {/* The Gallery (Shows All Items + Categories + Grid Toggle) */}
      <ProjectGallery isHome={false} />
      
    </main>
  );
}