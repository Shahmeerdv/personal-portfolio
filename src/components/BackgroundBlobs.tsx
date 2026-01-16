"use client";
import { motion } from "framer-motion";

export default function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
      
      {/* Blob 1: Emerald (Graphics) */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"
      />

      {/* Blob 2: Blue (Software) */}
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [50, -50, 50],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"
      />

      {/* Blob 3: Purple/Zinc (Center subtle depth) */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-800/20 rounded-full blur-[130px]"
      />
      
    </div>
  );
}