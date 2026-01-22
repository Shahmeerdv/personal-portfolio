"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center pl-1 pr-6 py-1 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl">
        
        {/* --- PROFILE ICON --- */}
        <Link 
          href="/" 
          // 1. Added 'flex' so it holds its shape perfectly
          // 2. Removed 'mr-2' (we will use the parent gap for spacing instead)
          className="relative flex shrink-0 w-10 h-10 rounded-full overflow-hidden border border-zinc-700 hover:border-emerald-400 transition-colors group"
        >
          <Image 
            src="/profile3.png" 
            alt="Profile"
            fill
            // 3. CHANGED to 'object-[50%_35%]' to pull the image down slightly so your head isn't cut off
            className="object-cover object-[50%_35%] group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* --- NAVIGATION LINKS --- */}
        {/* 4. Removed the extra <div> wrapper. Now flex gap handles consistent spacing. */}
        <div className="flex items-center gap-6 ml-4">
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