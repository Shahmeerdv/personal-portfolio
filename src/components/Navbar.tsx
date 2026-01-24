"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      {/* FIXED PADDING HERE:
         - Changed 'pl-1' to 'pl-2' (gives profile pic a tiny bit of breathing room)
         - Changed 'pr-6' to 'pr-4' (tightens the right side so it doesn't look empty)
      */}
      <div className="flex items-center pl-2.5 pr-3 py-1.5 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl">
        
        {/* --- PROFILE ICON --- */}
        <Link 
          href="/" 
          className="relative flex shrink-0 w-10 h-10 rounded-full overflow-hidden border border-zinc-700 hover:border-emerald-400 transition-colors group"
        >
          <Image 
            src="/profile3.png" 
            alt="Profile"
            fill
            className="object-cover object-[50%_35%] group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* --- NAVIGATION LINKS --- */}
        {/* Adjusted ml-3 (was ml-4) to tighten the gap between profile and text slightly */}
        <div className="flex items-center gap-6 ml-3">
          <Link 
            href="/" 
            className={`text-sm font-medium transition-colors ${
              pathname === "/" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </Link>
          
          <Link 
            href="/about" 
            className={`text-sm font-medium transition-colors ${
              pathname === "/about" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            About
          </Link>
          
          <Link 
            href="/store1" 
            className={`text-sm font-medium transition-colors ${
              pathname === "/store1" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Store
          </Link>
        </div>

      </div>
    </nav>
  );
}