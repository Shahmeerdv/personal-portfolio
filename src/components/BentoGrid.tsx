"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, Code, Palette, ShoppingBag } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

export default function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[180px] gap-4 max-w-7xl mx-auto p-4">
      
      {/* Item 1: Large Featured Project */}
      <SpotlightCard className="md:col-span-2 md:row-span-2">
        <div className="flex h-full flex-col justify-between p-6">
          <div className="rounded-full border border-white/10 bg-white/5 p-2 w-fit">
            <Code className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">Project Nexus</h3>
            <p className="text-zinc-400 mt-2">Next-gen dashboard with real-time analytics.</p>
          </div>
        </div>
      </SpotlightCard>

      {/* Item 2: Branding Project */}
      <SpotlightCard className="md:col-span-1">
        <div className="flex h-full flex-col justify-between p-6">
          <Palette className="h-6 w-6 text-pink-400" />
          <h3 className="text-xl font-bold text-white">Neon Branding</h3>
        </div>
      </SpotlightCard>

      {/* Item 3: Store Link */}
      <SpotlightCard className="md:col-span-1">
        <div className="flex h-full flex-col justify-between p-6 group cursor-pointer">
          <div className="flex justify-between">
             <ShoppingBag className="h-6 w-6 text-emerald-400" />
             <ArrowUpRight className="text-zinc-500 group-hover:text-white transition-colors" />
          </div>
          <h3 className="text-xl font-bold text-white">Buy Assets</h3>
        </div>
      </SpotlightCard>

      {/* Item 4: Mobile App */}
      <SpotlightCard className="md:col-span-2">
         <div className="flex h-full flex-col justify-between p-6">
            <Code className="h-6 w-6 text-blue-400" />
            <div>
               <h3 className="text-xl font-bold text-white">Flux Mobile App</h3>
               <p className="text-zinc-400 text-sm">Flutter based finance application.</p>
            </div>
         </div>
      </SpotlightCard>

    </div>
  );
}