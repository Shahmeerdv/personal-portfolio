"use client";
import { useState, useCallback } from "react"; 
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, Layers, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react"; 
import Link from "next/link";
import { softwareProjects } from "@/lib/softwareProjects";

export default function SoftwareShowcase({ showTitle = true }: { showTitle?: boolean }) {
  const [selected, setSelected] = useState<(typeof softwareProjects)[0] | null>(null);
  
  // Track the current image index
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const currentScreenshots = selected?.screenshots || [];

  // --- Navigation Logic ---
  const showNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! + 1) % currentScreenshots.length);
  }, [lightboxIndex, currentScreenshots.length]);

  const showPrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev! - 1 + currentScreenshots.length) % currentScreenshots.length);
  }, [lightboxIndex, currentScreenshots.length]);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      
      {showTitle && (
        <div className="mb-10 border-l-4 border-blue-500 pl-4">
          <Link href="/software" className="group inline-block">
            <h2 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors cursor-pointer">
              Software Projects
            </h2>
          </Link>
        </div>
      )}

      {/* --- THE GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {softwareProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelected(project)}
            className="group relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-blue-500/50 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-blue-500/20 group-hover:text-blue-400 transition-colors">
                <Layers size={24} />
              </div>
              <Github className="text-zinc-600 group-hover:text-white transition-colors" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-zinc-400 text-sm line-clamp-3">
              {project.description}
            </p>
            
            <div className="flex gap-2 mt-4 flex-wrap">
              {project.tech.map((t) => (
                <span key={t} className="text-xs text-zinc-500 border border-zinc-800 px-2 py-1 rounded-full">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* --- PROJECT DETAILS MODAL --- */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelected(null)} 
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()} 
              className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex justify-between items-center p-6 bg-zinc-900 border-b border-zinc-800">
                <h3 className="text-2xl font-bold text-white">{selected.title}</h3>
                <button 
                  onClick={() => setSelected(null)}
                  className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                  <div className="flex-1">
                    <p className="text-zinc-300 leading-relaxed mb-4">
                      {selected.description}
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      {selected.tech.map((t) => (
                        <span key={t} className="text-xs font-medium text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    {selected.github && (
                      <a
                        href={selected.github}
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-zinc-200 transition-colors"
                      >
                        <Github size={20} /> View Source
                      </a>
                    )}
                  </div>
                </div>

                {/* Gallery Grid */}
                {currentScreenshots.length > 0 && (
                  <>
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Project Gallery</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentScreenshots.map((shot, index) => (
                        <div 
                          key={index} 
                          onClick={(e) => {
                            e.stopPropagation();
                            setLightboxIndex(index);
                          }}
                          className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 group cursor-zoom-in"
                        >
                          <img 
                            src={shot} 
                            alt={`${selected.title} screenshot ${index + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                             <ZoomIn className="text-white" size={24} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FULL SCREEN LIGHTBOX (Instant Switch) --- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 backdrop-blur-md touch-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close Button */}
            <button 
                onClick={() => setLightboxIndex(null)}
                className="absolute top-6 right-6 z-20 text-zinc-400 hover:text-white p-2 rounded-full bg-zinc-900/50 hover:bg-zinc-800 transition-all"
            >
                <X size={32} />
            </button>
            
            {/* Navigation Arrows */}
            {currentScreenshots.length > 1 && (
              <>
                <button
                  onClick={showPrev}
                  className="absolute left-4 z-20 hidden md:flex p-3 rounded-full bg-black/50 text-white hover:bg-zinc-800/80 transition-all"
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-4 z-20 hidden md:flex p-3 rounded-full bg-black/50 text-white hover:bg-zinc-800/80 transition-all"
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}

            {/* The Image (No transition animations) */}
            <motion.img
                key={lightboxIndex} 
                src={currentScreenshots[lightboxIndex]}
                alt={`Screenshot ${lightboxIndex + 1}`}
                // 👇 Swipe Logic (Drag)
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2} 
                onDragEnd={(e, { offset }) => {
                  const swipeThreshold = 50; 
                  if (offset.x > swipeThreshold) {
                    showPrev();
                  } else if (offset.x < -swipeThreshold) {
                    showNext();
                  }
                }}
                // 👇 No animation props here = Instant Switch
                className="max-w-full max-h-[90vh] object-contain rounded-md shadow-2xl relative z-10"
                onClick={(e) => e.stopPropagation()} 
            />

            {/* Counter */}
            {currentScreenshots.length > 1 && (
                 <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-zinc-400 text-sm bg-black/50 px-3 py-1 rounded-full">
                   {lightboxIndex + 1} / {currentScreenshots.length}
                 </div>
            )}

          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}