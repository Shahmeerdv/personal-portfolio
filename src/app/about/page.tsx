"use client";
import { motion } from "framer-motion";
import SpotlightCard from "@/components/SpotlightCard";
import { ArrowUpRight } from "lucide-react";

// Mock Clients - Replace these with your real client names
const clients = [
  { name: "World Lacrosse", location: "International" },
  { name: "GAME", location: "Pakistan" },
  { name: "PCB", location: "Pakistan" },
  { name: "Big Star Creations", location: "UK" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          TWO WORLDS. <br />
          <span className="text-zinc-500">ONE STANDARD OF EXCELLENCE.</span>
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
        
        {/* Left Column: Dual Professional Bio */}
        <div className="space-y-10 text-zinc-400 text-lg leading-relaxed">
           
           <p>
             I am <strong className="text-white">Shahmeer</strong>. I operate at the professional level in two distinct disciplines: Software Engineering and Sports Graphic Design.
           </p>

           {/* Role 1: Engineering */}
           <div>
             <h3 className="text-white text-xl font-bold mb-2 flex items-center gap-2">
               01. The Engineer
             </h3>
             <p>
               My focus is on building scalable, intelligent systems. Specializing in <strong className="text-white">Web Development</strong> and <strong className="text-white">Artificial Intelligence</strong>, I develop robust applications using Next.js and Python. I am actively exploring how AI agents can solve complex real-world problems.
             </p>
           </div>

           {/* Role 2: Design */}
           <div>
             <h3 className="text-white text-xl font-bold mb-2 flex items-center gap-2">
               02. The Designer
             </h3>
             <p>
               Independently, I am a specialized designer for the <strong className="text-white">Sports Industry</strong>. I work with athletes and organizations globally to create high-impact matchday visuals and branding. This is not just a side passion—it is a dedicated service where I deliver premium creative assets for international clients.
             </p>
           </div>
        </div>

        {/* Right Column: Skills Separated */}
        <div className="space-y-6">
           
           {/* Engineering Stack */}
           <SpotlightCard className="p-8">
              <h3 className="text-lg font-mono text-blue-400 mb-4 tracking-widest">ENGINEERING STACK</h3>
              <div className="flex flex-wrap gap-2">
                 {["React", "Next.js", "TypeScript", "Python", "TensorFlow", "OpenCV", "Supabase"].map((tech) => (
                    <span key={tech} className="px-3 py-1 text-sm bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300">
                       {tech}
                    </span>
                 ))}
              </div>
           </SpotlightCard>

           {/* Design Tools */}
           <SpotlightCard className="p-8">
              <h3 className="text-lg font-mono text-pink-400 mb-4 tracking-widest">DESIGN TOOLS</h3>
              <div className="flex flex-wrap gap-2">
                 {["Adobe Photoshop", "Illustrator", "Figma", "Sports Branding", "Social Media Kits"].map((tool) => (
                    <span key={tool} className="px-3 py-1 text-sm bg-zinc-900 border border-zinc-800 rounded-full text-zinc-300">
                       {tool}
                    </span>
                 ))}
              </div>
           </SpotlightCard>

           <SpotlightCard className="p-6 flex justify-between items-center bg-green-900/10 border-green-900/30">
              <div>
                 <h4 className="text-green-100 font-bold text-lg">Open for Work</h4>
                 <p className="text-green-400/60 text-sm">Accepting new projects.</p>
              </div>
              <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"/>
           </SpotlightCard>
        </div>
      </div>

      {/* --- NEW CLIENTS SECTION --- */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="border-t border-zinc-800 pt-16"
      >
        <h3 className="text-2xl font-bold text-white mb-8">Trusted By</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="group relative flex flex-col items-center justify-center p-8 bg-zinc-900/30 border border-zinc-800 rounded-xl hover:bg-zinc-800/50 transition-colors"
            >
              <h4 className="text-zinc-400 font-bold text-lg group-hover:text-white transition-colors text-center">
                {client.name}
              </h4>
              <span className="text-xs text-zinc-600 mt-1 uppercase tracking-wider group-hover:text-zinc-400 transition-colors">
                {client.location}
              </span>
              
              <ArrowUpRight className="absolute top-4 right-4 text-zinc-700 opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" size={16} />
            </div>
          ))}
        </div>
      </motion.div>

    </main>
  );
}