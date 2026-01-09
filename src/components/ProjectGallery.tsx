"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 
import SpotlightCard from "@/components/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion"; 
import { X, ArrowRight } from "lucide-react"; 
import Link from "next/link"; 

interface Project {
  id: number;
  title: string;
  category: string;
  sub_category: string;
  image_url: string | null;
}

export default function ProjectGallery({ isHome = false }: { isHome?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Cricket", "Football", "Lacrosse", "Other", "Personal"];

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from('portfolio_items')
        .select('*')
        .order('id', { ascending: false });

      if (error) console.error("Error:", error);
      else setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    return p.category === filter || p.sub_category === filter;
  });

  // --- DISPLAY LOGIC ---
  let displayProjects = isHome ? projects.slice(0, 6) : filteredProjects;

  if (isHome && displayProjects.length > 0 && displayProjects.length < 6) {
    const missingCount = 6 - displayProjects.length;
    for (let i = 0; i < missingCount; i++) {
      displayProjects.push({ 
        ...displayProjects[displayProjects.length - 1], 
        id: 99999 + i 
      });
    }
  }

  if (loading) return <div className="text-center text-zinc-500 py-10">Loading...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-6">
        <Link href="/graphics" className="group">
          <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors border-l-4 border-emerald-500 group-hover:border-emerald-400 pl-4 leading-none cursor-pointer">
            Graphics Projects
          </h2>
        </Link>
        
        {!isHome && (
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat
                    ? "bg-white text-black"
                    : "border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- THE HYBRID GRID/SLIDER --- 
         Mobile: flex + overflow-x-auto (Horizontal Scroll)
         Desktop: grid + grid-cols-3 (Standard Grid)
      */}
      <div className={`
        ${isHome 
          ? "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:pb-0 md:gap-6 scrollbar-hide" 
          : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        }
      `}>
        {displayProjects.map((project, index) => {
          
          const isArchiveLink = isHome && index === 5;

          return (
            <div 
              key={`${project.id}-${index}`} 
              onClick={() => !isArchiveLink && setSelectedProject(project)}
              // On Mobile Home: Force width to 85% of screen so users can see the next card peeking
              className={`${isHome ? "min-w-[85vw] md:min-w-0 snap-center" : ""}`}
            >
              {isArchiveLink ? (
                // --- FADED ARCHIVE BUTTON ---
                <Link href="/graphics" className="block relative w-full h-full group">
                  <SpotlightCard className="aspect-[4/5] overflow-hidden p-0 border-zinc-800 bg-black relative">
                    {project.image_url && (
                      <img 
                        src={project.image_url} 
                        alt="Archive Background" 
                        className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale blur-[3px] transition-all duration-500 group-hover:blur-0 group-hover:opacity-60 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors z-10">
                      <div className="p-5 rounded-full border-2 border-white/30 bg-black/60 backdrop-blur-md mb-4 group-hover:scale-110 group-hover:border-white transition-all shadow-xl">
                        <ArrowRight className="text-white w-8 h-8 md:w-6 md:h-6" />
                      </div>
                      <span className="text-white font-black tracking-widest uppercase text-lg md:text-sm drop-shadow-md">
                        View Full Archive
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              ) : (
                // --- NORMAL PROJECT CARD ---
                <SpotlightCard className="group aspect-[4/5] overflow-hidden p-0 border-zinc-800 bg-black cursor-pointer relative">
                  {project.image_url ? (
                    <div className="relative h-full w-full">
                      <motion.img 
                        layoutId={`image-${project.id}`} 
                        src={project.image_url} 
                        alt={project.title} 
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      <div className="absolute bottom-0 left-0 p-6 w-full">
                         <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mb-2 inline-block">
                           {project.category}
                         </span>
                         <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full w-full flex flex-col justify-end p-8 bg-zinc-900/50">
                      <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                    </div>
                  )}
                </SpotlightCard>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          >
            <button className="absolute top-5 right-5 text-white/50 hover:text-white z-50">
              <X size={40} />
            </button>
            <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              {selectedProject.image_url && (
                <motion.img
                  layoutId={`image-${selectedProject.id}`}
                  src={selectedProject.image_url}
                  className="max-h-[85vh] w-auto rounded-lg shadow-2xl border border-zinc-800 object-contain"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}