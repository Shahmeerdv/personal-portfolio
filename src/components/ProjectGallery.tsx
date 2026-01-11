"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase"; 
import SpotlightCard from "@/components/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion"; 
import { X, ArrowRight, LayoutGrid, StretchHorizontal } from "lucide-react"; 
import Link from "next/link"; 

interface Project {
  id: number;
  title: string;
  category: string;
  sub_category: string;
  image_url: string | null;
  alt_text: string | null; // <--- 1. Interface includes the new column
}

export default function ProjectGallery({ isHome = false }: { isHome?: boolean }) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // STATE: Mobile View Toggle
  const [isGridMode, setIsGridMode] = useState(false);

  const [filter, setFilter] = useState("All");
  const categories = ["All", "Cricket", "Football", "Lacrosse", "Other",];

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
      <div className="flex flex-row flex-wrap justify-between items-end mb-6 md:mb-10 gap-4">
        
        <div className="flex items-center gap-4">
          <Link href="/graphics" className="group">
            <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors border-l-4 border-emerald-500 group-hover:border-emerald-400 pl-4 leading-none cursor-pointer">
              Graphics Projects
            </h2>
          </Link>

          {/* Toggle Button (Visible everywhere on mobile) */}
          <button 
            onClick={() => setIsGridMode(!isGridMode)}
            className="md:hidden p-2.5 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95"
          >
            {isGridMode ? <StretchHorizontal size={20} strokeWidth={2.5} /> : <LayoutGrid size={20} strokeWidth={2.5} />}
          </button>
        </div>
        
        {/* Categories (Hidden on Home) */}
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

      {/* Grid / Slider Logic */}
      <div className={`
        ${/* Desktop Rules */ "md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:pb-0"}
        
        ${/* Mobile Rules */ 
           isGridMode 
             ? "grid grid-cols-4 gap-2" 
             : isHome 
               ? "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide" 
               : "grid grid-cols-1 gap-6" 
         }
      `}>
        {displayProjects.map((project, index) => {
          
          const isArchiveLink = isHome && index === 5;

          return (
            <div 
              key={`${project.id}-${index}`} 
              onClick={() => !isArchiveLink && setSelectedProject(project)}
              className={`
                 ${isHome && !isGridMode ? "min-w-[85vw] md:min-w-0 snap-center" : "min-w-0"}
              `}
            >
              {isArchiveLink ? (
                // --- FADED ARCHIVE BUTTON ---
                <Link href="/graphics" className="block relative w-full h-full group">
                  <SpotlightCard className="aspect-[4/5] overflow-hidden p-0 border-zinc-800 bg-black relative">
                    {project.image_url && (
                      <img 
                        src={project.image_url} 
                        alt="Archive Background" 
                        className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale blur-[3px]"
                      />
                    )}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10">
                      <div className={`rounded-full border-2 border-white/30 bg-black/60 backdrop-blur-md mb-2 group-hover:scale-110 group-hover:border-white transition-all shadow-xl
                        ${isGridMode ? "p-1 scale-75" : "p-5"}`}
                      >
                        <ArrowRight className={`text-white ${isGridMode ? "w-3 h-3" : "w-8 h-8 md:w-6 md:h-6"}`} />
                      </div>
                      
                      {!isGridMode && (
                        <span className="text-white font-black tracking-widest uppercase text-lg md:text-sm drop-shadow-md">
                          View Full Archive
                        </span>
                      )}
                    </div>
                  </SpotlightCard>
                </Link>
              ) : (
                // --- NORMAL PROJECT CARD ---
                <SpotlightCard className="group aspect-[4/5] overflow-hidden p-0 border-zinc-800 bg-black cursor-pointer relative">
                  {project.image_url ? (
                    <div className="relative h-full w-full">
                      
                      {/* 👇 2. UPDATED: Now uses alt_text for SEO */}
                      <motion.img 
                        layoutId={`image-${project.id}`} 
                        src={project.image_url} 
                        alt={project.alt_text || project.title} 
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                      
                      {!isGridMode && (
                        <div className="absolute bottom-0 left-0 p-6 w-full">
                           <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mb-2 inline-block">
                             {project.category}
                           </span>
                           <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                        </div>
                      )}
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
                  // 👇 3. UPDATED: Modal image also uses SEO text
                  alt={selectedProject.alt_text || selectedProject.title}
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