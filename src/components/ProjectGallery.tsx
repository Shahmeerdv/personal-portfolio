"use client";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase"; 
import SpotlightCard from "@/components/SpotlightCard";
import { motion, AnimatePresence, useMotionValue } from "framer-motion"; 
import { X, LayoutGrid, StretchHorizontal, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"; 
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
  
  const [direction, setDirection] = useState(0);
  const x = useMotionValue(0);

  const categories = ["All", "Cricket", "Football", "Lacrosse", "Matchdays", "Other"];

  // 1. LOCK BODY SCROLL (Hides scrollbar & scroll-up button)
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProject]);

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

  const navList = isHome ? projects.slice(0, 6) : filteredProjects;

  const getProject = useCallback((offset: number) => {
    if (!selectedProject) return null;
    const currentIndex = navList.findIndex(p => p.id === selectedProject.id);
    if (currentIndex === -1) return null;
    const newIndex = (currentIndex + offset + navList.length) % navList.length;
    return navList[newIndex];
  }, [selectedProject, navList]);

  const navigateLightbox = useCallback((newDirection: number) => {
    const nextProj = getProject(newDirection);
    if (!nextProj) return;
    setDirection(newDirection);
    setSelectedProject(nextProj);
    x.set(0); 
  }, [getProject, x]);

  useEffect(() => {
    if (!selectedProject) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, navigateLightbox]);

  if (loading) return <div className="text-center text-zinc-500 py-10">Loading...</div>;
  if (projects.length === 0) return null;

  const prevProject = getProject(-1);
  const nextProject = getProject(1);

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
          <button onClick={() => setIsGridMode(!isGridMode)} className="md:hidden p-2.5 rounded-full bg-emerald-500 text-black hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] active:scale-95">
            {isGridMode ? <StretchHorizontal size={20} strokeWidth={2.5} /> : <LayoutGrid size={20} strokeWidth={2.5} />}
          </button>
        </div>
        {!isHome && (
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === cat ? "bg-white text-black" : "border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"}`}>
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={isGridMode ? "grid-view" : "list-view"} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`${"md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:pb-0"} ${isGridMode ? "grid grid-cols-4 gap-2" : isHome ? "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 scrollbar-hide" : "grid grid-cols-1 gap-6"}`}
        >
          {displayProjects.map((project, index) => {
            const isArchiveLink = isHome && index === 5;
            return (
              <div key={`${project.id}-${index}`} onClick={() => !isArchiveLink && setSelectedProject(project)} className={`${isHome && !isGridMode ? "min-w-[85vw] md:min-w-0 snap-center" : "min-w-0"}`}>
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
                        <motion.img layoutId={`image-${project.id}-${isGridMode ? 'grid' : 'list'}`} src={project.image_url} alt={project.alt_text || project.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"/>
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

      {/* --- LIGHTBOX MODAL --- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-0 overflow-hidden"
          >
            {/* 2. PROMINENT CLOSE BUTTON */}
            <button 
                onClick={() => setSelectedProject(null)}
                className="fixed top-6 right-6 z-[110] p-3 rounded-full bg-white/10 border border-white/20 text-white backdrop-blur-lg hover:bg-red-500/80 hover:border-red-500 hover:rotate-90 transition-all duration-300 shadow-2xl group"
            >
              <X size={32} strokeWidth={2.5} className="drop-shadow-md" />
            </button>

            {/* Container for the draggable strip */}
            <div 
              className="relative w-full h-full flex items-center justify-center" 
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Navigation Arrows */}
              <button onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }} className="absolute left-4 md:left-8 z-50 p-4 rounded-full text-white/90 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center">
                  <ChevronLeft size={36} strokeWidth={2} />
              </button>
              <button onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }} className="absolute right-4 md:right-8 z-50 p-4 rounded-full text-white/90 bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center">
                  <ChevronRight size={36} strokeWidth={2} />
              </button>

              {/* DRAGGABLE STRIP */}
              <motion.div
                className="relative flex items-center justify-center w-full h-full md:max-w-7xl"
                style={{ x }} 
                drag="x"
                dragConstraints={{ left: 0, right: 0 }} 
                dragElastic={0.2} 
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  const threshold = 10000;
                  if (swipe < -threshold || offset.x < -100) navigateLightbox(1);
                  else if (swipe > threshold || offset.x > 100) navigateLightbox(-1);
                  else x.set(0); 
                }}
              >
                
                {/* PREV Image (Left) */}
                {prevProject && (
                  <div className="absolute left-[-100%] top-0 w-full h-full flex items-center justify-center px-4 opacity-30 blur-sm">
                    <img src={prevProject.image_url || ""} className="max-h-[80vh] object-contain" alt="prev" />
                  </div>
                )}

                {/* CURRENT Image (Center) */}
                <div className="relative w-full h-full flex items-center justify-center px-4">
                  <motion.img
                    key={selectedProject.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    src={selectedProject.image_url || ""}
                    className="max-h-full max-w-full rounded-md shadow-2xl object-contain border border-zinc-800"
                    alt={selectedProject.title}
                  />
                </div>

                {/* NEXT Image (Right) */}
                {nextProject && (
                  <div className="absolute left-[100%] top-0 w-full h-full flex items-center justify-center px-4 opacity-30 blur-sm">
                    <img src={nextProject.image_url || ""} className="max-h-[80vh] object-contain" alt="next" />
                  </div>
                )}
                
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}