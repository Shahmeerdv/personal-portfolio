"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, Layers, Link as LinkIcon } from "lucide-react";
import SpotlightCard from "./SpotlightCard";
import FilterTabs from "./FilterTabs";

// --- YOUR PROJECT DATA ---
// Instructions:
// 1. Put your images in the 'public/work' folder.
// 2. Update the 'image' path below (e.g. "/work/poster1.jpg")
// 3. For Software projects, set image: null and fill in the text.

const allProjects = [
  // 1. A Software Project (Wide Card)
  {
    id: 1,
    type: "Software",
    title: "Athlete AI Tracker",
    desc: "Computer vision app that tracks player movement speed in real-time.",
    tags: ["Python", "OpenCV", "React"],
    link: "https://github.com/yourusername", // Link to your repo
    image: null,
    size: "wide", // Use "wide" for big software features
  },

  // 2. A Graphic Design Poster (Tall Vertical Card)
  {
    id: 2,
    type: "Graphics",
    title: "Bruno Fernandes Milestone",
    image: "/work/bruno.jpeg", // Make sure this file exists in public/work/
    size: "tall", // Use "tall" for vertical posters
  },

  // 3. Another Graphic (Standard Square-ish)
  {
    id: 3,
    type: "Graphics",
    title: "Haaladn Achieves Greatness",
    image: "/work/haaland.jpeg",
    size: "tall",
  },

  // 4. Software Project (Standard Card)
  {
    id: 4,
    type: "Software",
    title: "Portfolio CMS",
    desc: "The backend powering this website.",
    tags: ["Next.js", "Supabase"],
    link: "#",
    image: null,
    size: "normal",
  },

  // 5. Another Graphic (Tall)
  {
    id: 5,
    type: "Graphics",
    title: "Ayemric Laporte Trasnfer",
    image: "/work/laporte.jpeg",
    size: "tall",
  },

  // 6. Store Asset (e.g. Selling a design)
  {
    id: 6,
    type: "Store",
    title: "Ultimate UI Kit",
    desc: "Premium dashboard assets.",
    tags: ["Figma", "PSD"],
    link: "#",
    image: null,
    size: "normal",
  }
];

export default function ProjectGallery() {
  const [filter, setFilter] = useState("All");

  const filtered = allProjects.filter(
    (p) => filter === "All" || p.type === filter
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 mb-24">
      <FilterTabs current={filter} onChange={setFilter} />

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <AnimatePresence>
          {filtered.map((project) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              key={project.id}
              className={`
                ${project.size === "wide" ? "md:col-span-2" : "md:col-span-1"}
                ${project.size === "tall" ? "row-span-2 h-[450px]" : "h-[250px]"}
              `}
            >
              <SpotlightCard className="h-full group">
                {/* CHECK: Is this a Graphic (Image) or Software (Text)? */}
                
                {project.image ? (
                  // --- IMAGE CARD (Graphics) ---
                  <div className="relative h-full w-full">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Dark Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                    
                    {/* Text Overlay */}
                    <div className="absolute bottom-0 left-0 p-5 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                          Graphic
                        </span>
                        <ArrowUpRight className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={18} />
                      </div>
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    </div>
                  </div>
                ) : (
                  // --- TEXT CARD (Software) ---
                  <div className="p-6 flex flex-col justify-between h-full relative z-10">
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-zinc-800/50 rounded-xl border border-zinc-700/50">
                           <Layers size={24} className="text-emerald-400"/>
                        </div>
                        <a href={project.link} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                           <Github size={20} className="text-zinc-500 hover:text-white transition-colors"/>
                        </a>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{project.desc}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {project.tags?.map(tag => (
                        <span key={tag} className="text-xs font-medium text-zinc-400 border border-zinc-800 bg-zinc-900/50 px-3 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}