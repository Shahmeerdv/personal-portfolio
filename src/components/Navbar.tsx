"use client"; // <--- THIS LINE FIXES THE ERROR
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; 

export default function Navbar() {
  const pathname = usePathname(); // Now we can use this to style the active link

  return (
    <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center">
      <div className="flex items-center gap-1 p-2 bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-full shadow-2xl">
        
        {/* --- PROFILE ICON (Acts as Home Button) --- */}
        <Link 
          href="/" 
          className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-zinc-700 hover:border-emerald-400 transition-colors mr-2 group"
        >
          {/* Make sure profile.jpg is in your public folder! */}
          <Image 
            src="/profile.jpeg" 
            alt="Profile"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* --- NAVIGATION LINKS --- */}
        <div className="flex items-center px-2 gap-4">
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
            href="/store" 
            className={`text-sm font-medium transition-colors ${
              pathname === "/store" ? "text-white" : "text-zinc-400 hover:text-white"
            }`}
          >
            Store
          </Link>
        </div>

      </div>
    </nav>
  );
}