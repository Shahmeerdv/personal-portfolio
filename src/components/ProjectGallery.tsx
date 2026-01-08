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
  
  // --- UPDATED CATEGORIES ---
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

  // Filter Logic
  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    // Checks if the category OR sub_category matches the button you clicked
    return p.category === filter || p.sub_category === filter;
  });

  // Display Logic: Limit to 4 if on Home page
  const displayProjects = isHome ? projects.slice(0, 4) : filteredProjects;

  if (loading) return <div className="text-center text-zinc-500 py-10">Loading...</div>;

  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8">
        <h2 className="text-3xl font-bold text-white border-l-4 border-emerald-500 pl-4">
          Graphics Projects
        </h2>
        
        {/* Only show these buttons if we are NOT on the home page */}
        {!isHome && (
          <div className="flex gap-2 mt-4 md:mt-0 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === cat
                    ? "bg-white text-black"
                    : "border border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayProjects.map((project) => (
          <div key={project.id} onClick={() => setSelectedProject(project)}>
            <SpotlightCard className="group h-[400px] overflow-hidden p-0 border-zinc-800 bg-black cursor-pointer">
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
          </div>
        ))}
      </div>

      {/* View All Button (Home Page Only) */}
      {isHome && (
        <div className="mt-10 text-center">
          <Link 
            href="/graphics" 
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors border-b border-zinc-800 hover:border-white pb-1"
          >
            View Full Archive <ArrowRight size={16} />
          </Link>
        </div>
      )}

      {/* Modal / Lightbox */}
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