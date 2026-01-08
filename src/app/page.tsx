import ProjectGallery from "@/components/ProjectGallery";
import SoftwareShowcase from "@/components/SoftwareShowcase";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col pt-32 pb-20">
      {/* Hero */}
      <div className="text-center mb-16 px-4">
        <div className="inline-block mb-4 px-3 py-1 border border-zinc-800 rounded-full bg-zinc-900/50">
           <span className="text-xs text-zinc-400 uppercase tracking-widest">Available for Freelance</span>
        </div>
        <h1 className="text-5xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white via-white to-zinc-600 bg-clip-text text-transparent mb-6">
          VISUAL & CODE
        </h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">
          A collection of high-performance software and avant-garde graphic design.
        </p>
      </div>

      {/* 1. Graphics Projects (Highlights Only) */}
      <div className="mb-24">
        {/* We pass isHome={true} to limit it to 4 items and hide categories */}
        <ProjectGallery isHome={true} />
      </div>
      
      {/* 2. Software Projects */}
      <div id="software">
         {/* Renamed Header is inside the component? No, let's look at SoftwareShowcase. 
             If you want to rename the header, you can do it inside SoftwareShowcase.tsx 
             OR wrap it here. Let's assume you updated SoftwareShowcase text manually.
         */}
        <SoftwareShowcase />
      </div>
      
    </main>
  );
}