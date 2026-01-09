"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, X, Layers } from "lucide-react";
import Link from "next/link"; // <--- Import Link
import { softwareProjects } from "@/lib/softwareProjects";

export default function SoftwareShowcase({ showTitle = true }: { showTitle?: boolean }) {
  const [selected, setSelected] = useState<(typeof softwareProjects)[0] | null>(null);

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      
      {/* 👇 UPDATED: Title is now a Link to the full page */}
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

      {/* --- THE MODAL (POPUP) --- */}
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

                {/* Screenshots Gallery in Modal */}
                {selected.screenshots && selected.screenshots.length > 0 && (
                  <>
                    <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Project Gallery</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selected.screenshots.map((shot, index) => (
                        <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-zinc-800 group">
                          <img 
                            src={shot} 
                            alt={`${selected.title} screenshot ${index + 1}`} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
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
    </section>
  );
}