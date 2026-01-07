"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Update the paths to match our new structure
const navItems = [
  { name: "Work", path: "/" },       // Home page (Gallery)
  { name: "About", path: "/about" }, // The new About page
  { name: "Store", path: "/store" }, // Coming soon
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
      <nav className="flex items-center gap-1 rounded-full border border-white/10 bg-black/50 p-2 backdrop-blur-xl shadow-lg">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`relative px-5 py-2 text-sm font-medium transition-all duration-300 ${
                isActive ? "text-white" : "text-zinc-400 hover:text-white"
              }`}
            >
              {isActive && (
                <span className="absolute inset-0 -z-10 rounded-full bg-zinc-800/80 shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
              )}
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}