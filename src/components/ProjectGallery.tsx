"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase"; 
import SpotlightCard from "@/components/SpotlightCard";
import { motion, AnimatePresence } from "framer-motion"; 
import { X, ArrowRight, LayoutGrid, StretchHorizontal, ChevronLeft, ChevronRight } from "lucide-react"; 
import Link from "next/link"; 

interface Project {
  id: number;
  title: string;
  category: string;
  sub_category: string;
  image_url: string | null;
  alt_text: string | null; 
}

interface GalleryProps {
  isHome?: boolean;
  title?: string;
  filterCategory?: string;
}

export default function ProjectGallery({ 
  isHome = false, 
  title = "Graphics Projects", 
  filterCategory 
}: GalleryProps) {
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGridMode, setIsGridMode] = useState(false);
  const [filter, setFilter] = useState("All");
  const categories = ["All", "Cricket", "Football", "Lacrosse", "Other", "Personal"];

  useEffect(() => {
    const fetchProjects = async () => {
      let query = supabase.from('portfolio_items').select('*').order('id', { ascending: false });
      if (filterCategory) query = query.eq('category', filterCategory); 

      const { data, error } = await query;
      if (error) console.error("Error:", error);
      else setProjects(data || []);
      setLoading(false);
    };
    fetchProjects();
  }, [filterCategory]);

  const filteredProjects = projects.filter((p) => {
    if (filter === "All") return true;
    return p.category === filter || p.sub_category === filter;
  });

  let displayProjects = isHome ? projects.slice(0, 6) : filteredProjects;

  if (isHome && displayProjects.length > 0 && displayProjects.length < 6) {
    const missingCount = 6 - displayProjects.length;
    for (let i = 0; i < missingCount; i++) {
      displayProjects.push({ ...displayProjects[displayProjects.length - 1], id: 99999 + i });
    }
  }

  // NAVIGATION LOGIC
  const navList = isHome ? projects.slice(0, 6) : filteredProjects;

  const navigateLightbox = useCallback((direction: "next" | "prev") => {
    if (!selectedProject) return;
    const currentIndex = navList.findIndex(p => p.id === selectedProject.id);
    if (currentIndex === -1) return;

    let newIndex;
    if (direction === "next") {
      newIndex = (currentIndex + 1) % navList.length;
    } else {
      newIndex = (currentIndex - 1 + navList.length) % navList.length;
    }
    setSelectedProject(navList[newIndex]);
  }, [selectedProject, navList]);

  // KEYBOARD LISTENERS
  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateLightbox("next");
      if (e.key === "ArrowLeft") navigateLightbox("prev");
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, navigateLightbox]);

  // SWIPE HANDLER
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  if (loading) return <div className="text-center text-zinc-500 py-10">Loading...</div>;
  if (projects.length === 0) return null;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-12">
      
      {/* Header */}
      <div className="flex flex-row flex-wrap justify-between items-end mb-6 md:mb-10 gap-4">
        <div className="flex items-center gap-4">
          <Link href={title.includes("Software") ? "/software" : "/graphics"} className="group">
            <h2 className="text-3xl md:text-4xl font-bold text-white group-hover:text-emerald-400 transition-colors border-l-4 border-emerald-500 group-hover:border-emerald-400 pl-4 leading-none cursor-pointer">
              {title}
            </h2>
          </Link>

          <button 
            onClick={() => setIsGridMode(!isGridMode)}
            className="md:hidden p-2.5 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95"
          >
            {isGridMode ? <StretchHorizontal size={20} strokeWidth={2.5} /> : <LayoutGrid size={20} strokeWidth={2.5} />}
          </button>
        </div>
        
        {!isHome && (
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === cat ? "bg-white text-black" : "border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid with Fade Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isGridMode ? "grid-view" : "list-view"} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`
            ${"md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:pb-0"}
            ${isGridMode 
                ? "grid grid-cols-4 gap-2" 
                : isHome 
                  ? "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide" 
                  : "grid grid-cols-1 gap-6" 
            }
          `}
        >
          {displayProjects.map((project, index) => {
            const isArchiveLink = isHome && index === 5;
            return (
              <div 
                key={`${project.id}-${index}`} 
                onClick={() => !isArchiveLink && setSelectedProject(project)}
                className={`${isHome && !isGridMode ? "min-w-[85vw] md:min-w-0 snap-center" : "min-w-0"}`}
              >
                {isArchiveLink ? (
                  <Link href="/graphics" className="block relative w-full h-full group">
                    <SpotlightCard className="aspect-[4/5] overflow-hidden p-0 border-zinc-800 bg-black relative">
                      {project.image_url && <img src={project.image_url} alt="Archive" className="absolute inset-0 h-full w-full object-cover opacity-40 grayscale blur-[3px]" />}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-10">
                        <div className={`rounded-full border-2 border-white/30 bg-black/60 backdrop-blur-md mb-2 group-hover:scale-110 group-hover:border-white transition-all shadow-xl ${isGridMode ? "p-1 scale-75" : "p-5"}`}>
                           <ArrowRight className={`text-white ${isGridMode ? "w-3 h-3" : "w-8 h-8 md:w-6 md:h-6"}`} />
                        </div>
                        {!isGridMode && <span className="text-white font-black tracking-widest uppercase text-lg md:text-sm drop-shadow-md">View Full Archive</span>}
                      </div>
                    </SpotlightCard>
                  </Link>
                ) : (
                  <SpotlightCard className="group aspect-[4/5] overflow-hidden p-0 border-zinc-800 bg-black cursor-pointer relative">
                    {project.image_url && (
                      <div className="relative h-full w-full">
                        <motion.img 
                          layoutId={`image-${project.id}-${isGridMode ? 'grid' : 'list'}`} 
                          src={project.image_url} 
                          alt={project.alt_text || project.title} 
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                        {!isGridMode && (
                          <div className="absolute bottom-0 left-0 p-6 w-full">
                             <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded mb-2 inline-block">{project.category}</span>
                             <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                          </div>
                        )}
                      </div>
                    )}
                  </SpotlightCard>
                )}
              </div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)} 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 touch-none"
          >
            {/* Close Button (Top Right corner of screen) */}
            <button className="fixed top-5 right-5 text-white/50 hover:text-white z-[60] p-2 bg-black/20 backdrop-blur-md rounded-full transition-all hover:bg-black/50">
              <X size={32} />
            </button>

            {/* Image Container (Relative parent for arrows) */}
            <div 
              className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center group/modal" 
              onClick={(e) => e.stopPropagation()}
            >
                
              {/* 👇 1. LEFT NAVIGATION BUTTON (Moved Inside & Styled) */}
              <button 
                onClick={(e) => { e.stopPropagation(); navigateLightbox("prev"); }}
                // Cool, sleek styling:
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full text-white/70 bg-black/30 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-black/70 hover:text-white hover:border-white/30 hover:scale-110 active:scale-95 hidden md:flex items-center justify-center"
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>

              {/* 👇 2. RIGHT NAVIGATION BUTTON (Moved Inside & Styled) */}
              <button 
                onClick={(e) => { e.stopPropagation(); navigateLightbox("next"); }}
                // Cool, sleek styling:
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full text-white/70 bg-black/30 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:bg-black/70 hover:text-white hover:border-white/30 hover:scale-110 active:scale-95 hidden md:flex items-center justify-center"
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>

              {selectedProject.image_url && (
                <motion.img
                  key={selectedProject.id}
                  layoutId={`image-${selectedProject.id}-${isGridMode ? 'grid' : 'list'}`}
                  src={selectedProject.image_url}
                  alt={selectedProject.alt_text || selectedProject.title}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={1}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) navigateLightbox("next");
                    else if (swipe > swipeConfidenceThreshold) navigateLightbox("prev");
                  }}
                  className="max-h-[85vh] w-auto rounded-lg shadow-2xl border border-zinc-800 object-contain cursor-grab active:cursor-grabbing"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}