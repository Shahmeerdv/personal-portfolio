"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Construction, ShoppingBag, CheckCircle2 } from "lucide-react";
import SpotlightCard from "@/components/SpotlightCard";

// Product Data Configuration
const products = [
  {
    id: 1,
    title: "Cricket Matchday Essentials",
    subtitle: "Vol. 1 • 3 PSD Templates",
    price: "$12.00",
    description: "The essential starter kit for cricket graphics. Includes 3 high-resolution templates: Starting XI, Scorecard, and Player Spotlight.",
    features: ["3 Fully Editable PSD Files", "Smart Object Replacements", "Commercial License Included"],
    image: "/dummystore/cricket.jpg", 
  },
  {
    id: 2,
    title: "Pro Football Core Pack",
    subtitle: "Soccer / Football • 3 PSDs",
    price: "$14.00",
    description: "Three aggressive, high-energy designs for football clubs. Features a dynamic roster reveal, halftime scoreboard, and 'Goal' alert graphic.",
    features: ["Social Media Optimized (4:5)", "3 Premium PSD Templates", "Free Font Links Included"],
    image: "/dummystore/football.jpg",
  },
  {
    id: 3,
    title: "Matchday Social Mini-Suite",
    subtitle: "Multi-Sport • Stories & Posts",
    price: "$11.00",
    description: "Three clean, modern layouts designed specifically for Instagram Stories (9:16). Perfect for quick game day announcements.",
    features: ["3 Story Templates", "Live Score & Fixture Layouts", "Easy Color Customization"],
    image: "/dummystore/matchday.jpg",
  },
  {
    id: 4,
    title: "Sports Typography Trio",
    subtitle: "Quote Templates • 3 PSDs",
    price: "$10.00",
    description: "Make your headlines pop. A curated set of 3 typography-focused templates perfect for post-match reactions and player quotes.",
    features: ["3 Unique Text Layouts", "Drag-and-Drop Photo Layer", "Bold, Impactful Styles"],
    image: "/dummystore/quotes.jpg",
  },
  {
    id: 5,
    title: "Essential GFX Starter Kit",
    subtitle: "Assets • Overlays & Backgrounds",
    price: "$15.00",
    description: "The secret sauce for pro designs. A curated starter pack of stadium lights, dust particles, and grunge textures to overlay on your work.",
    features: ["20 High-Res Overlays", "Transparent PNGs & JPEGs", "Compatible with Any Software"],
    image: "/dummystore/gfx-pack.jpg",
  },
];

export default function StorePage() {
  return (
    <main className="min-h-screen pt-32 pb-20 px-4 bg-black relative overflow-hidden flex flex-col items-center">
      
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" />

      {/* --- SECTION 1: COMING SOON ALERT --- */}
      <div className="w-full max-w-2xl relative z-10 flex flex-col items-center mb-20">
        <SpotlightCard className="p-12 text-center border-zinc-800 bg-zinc-900/50 backdrop-blur-xl">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-16 h-16 mx-auto bg-zinc-800 rounded-full flex items-center justify-center mb-6 border border-zinc-700 shadow-xl"
          >
            <ShoppingBag className="text-zinc-400" size={24} />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-black p-1.5 rounded-full border-4 border-zinc-900">
                <Construction size={14} strokeWidth={3} />
            </div>
          </motion.div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Store Coming Soon</h1>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">
            We are verifying our account with <span className="text-white font-semibold">Paddle</span>. The products below will be available for purchase shortly.
          </p>

          <div className="flex justify-center gap-4">
              <Link href="/" className="px-5 py-2 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors text-sm flex items-center gap-2">
                <ArrowLeft size={16} /> Back to Home
              </Link>
          </div>
        </SpotlightCard>
      </div>

      {/* --- SECTION 2: PRODUCT PREVIEW (REQUIRED FOR PADDLE VERIFICATION) --- */}
      <div className="w-full max-w-6xl relative z-10">
        <div className="flex items-center gap-4 mb-8">
            <h2 className="text-2xl font-bold text-white">Upcoming Products</h2>
            <div className="h-px flex-1 bg-zinc-800" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((product) => (
                <SpotlightCard key={product.id} className="p-6 border-zinc-800 bg-black flex flex-col md:flex-row gap-6 group">
                    {/* Product Image */}
                    <div className="w-full md:w-40 h-40 bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800 shrink-0 relative">
                        <Image 
                            src={product.image} 
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    </div>

                    <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                            <div>
                                <h3 className="text-xl font-bold text-white">{product.title}</h3>
                                <p className="text-sm text-zinc-500">{product.subtitle}</p>
                            </div>
                            <span className="px-3 py-1 bg-zinc-800 text-white font-mono rounded text-sm">{product.price}</span>
                        </div>

                        <p className="text-zinc-400 text-sm mb-4 leading-relaxed">
                            {product.description}
                        </p>

                        <ul className="space-y-2 mb-6">
                            {product.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                                    <CheckCircle2 size={14} className="text-emerald-500" /> {feature}
                                </li>
                            ))}
                        </ul>

                        <button disabled className="w-full py-2 rounded bg-zinc-800 text-zinc-500 text-sm font-bold cursor-not-allowed">
                            Purchasing Disabled (Verification Pending)
                        </button>
                    </div>
                </SpotlightCard>
            ))}
        </div>
      </div>

      {/* --- LEGAL FOOTER (REQUIRED) --- */}
      <div className="mt-20 border-t border-zinc-900 pt-8 w-full max-w-5xl flex flex-wrap gap-6 justify-center text-sm text-zinc-500">
         <span className="text-zinc-700">© 2026 Shahmeer Tech</span>
         <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
         <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
         <Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link>
      </div>

    </main>
  );
}