"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShoppingBag, 
  ChevronLeft, 
  ShieldCheck, 
  Tag,
  X,
  Download,
  Instagram,
  Lock 
} from "lucide-react";

const INSTAGRAM_URL = "https://instagram.com/msgraphics_10";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  buy_link: string | null;
  category: string;
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) console.error("Error:", error);
      else setProducts(data || []);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-20 px-4">
      
      {/* --- HEADER --- */}
      <div className="relative max-w-7xl mx-auto mb-12 text-center">
        <div className="absolute left-0 top-2 hidden md:block z-50">
          <Link href="/" className="flex items-center gap-1 text-zinc-500 hover:text-white transition-colors text-sm font-medium">
            <ChevronLeft size={16} /> Back
          </Link>
        </div>

        {/* Removed "Digital Shop" Badge here */}

        <motion.h1 
           initial={{ opacity: 0, y: 20 }} 
           animate={{ opacity: 1, y: 0 }} 
           transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
           className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
        >
          THE STORE
        </motion.h1>

        <motion.p 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.2 }}
           className="text-zinc-400 text-lg max-w-2xl mx-auto mb-6"
        >
          Premium design resources and code templates.
        </motion.p>

        {/* TRUST BADGE */}
        <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5, delay: 0.3 }}
           className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-full"
        >
           <Lock size={14} className="text-emerald-500" />
           <span className="text-zinc-500 text-xs md:text-sm font-medium">
              Payments processed securely by <span className="text-white">Lemon Squeezy</span>
           </span>
        </motion.div>
      </div>

      {/* --- PRODUCT GRID --- */}
      {loading ? (
        <div className="text-center text-zinc-500 mt-20">Loading shop...</div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {products.map((product) => {
                const isFree = product.price === 0;

                return (
                    <motion.div 
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        onClick={() => setSelectedProduct(product)}
                        className="group bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 hover:bg-zinc-900/50 transition-all duration-300 cursor-pointer flex flex-col h-full"
                    >
                    
                    {/* IMAGE */}
                    <div className="relative overflow-hidden bg-zinc-800 shrink-0 aspect-[4/3] w-full">
                        {product.image_url ? (
                        <img 
                            src={product.image_url} 
                            alt={product.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        ) : (
                        <div className="w-full h-full flex items-center justify-center text-zinc-700">
                            <ShoppingBag size={24} opacity={0.5} />
                        </div>
                        )}

                        {/* Price Tag on Image */}
                        <div className={`absolute bottom-2 right-2 backdrop-blur-md border px-2 py-0.5 md:px-2.5 md:py-1 rounded-md shadow-lg
                            ${isFree ? "bg-emerald-500/90 text-black border-emerald-500/50" : "bg-black/80 text-white border-white/10"}
                        `}>
                            <span className="font-bold text-[10px] md:text-xs">
                                {isFree ? "FREE" : `$${product.price}`}
                            </span>
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-col flex-grow p-3 md:p-5">
                        
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                                <Tag size={10} /> {product.category || "Asset"}
                            </span>
                        </div>

                        <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-2 text-xs md:text-xl mb-1 md:mb-2">
                            {product.title}
                        </h3>
                        
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 hidden md:block">
                            {product.description}
                        </p>

                        <div className="mt-auto flex gap-2">
                            <div className="flex flex-grow items-center justify-center gap-2 rounded-lg font-bold transition-all py-2 md:py-3 hover:bg-zinc-200 text-xs md:text-sm bg-white text-black">
                                {isFree ? "Get Free" : "Buy Now"} 
                                {isFree ? <Download size={14} /> : <ShieldCheck size={14} />}
                            </div>
                        </div>
                    </div>

                    </motion.div>
                );
            })}
        </div>
      )}

      {/* --- MODAL --- */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-end md:items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-zinc-800 rounded-t-2xl md:rounded-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              
              <div className="relative aspect-video w-full bg-zinc-800">
                {selectedProduct.image_url ? (
                   <img 
                     src={selectedProduct.image_url} 
                     alt={selectedProduct.title} 
                     className="w-full h-full object-cover"
                   />
                ) : (
                   <div className="w-full h-full flex items-center justify-center text-zinc-700">
                      <ShoppingBag size={48} opacity={0.5} />
                   </div>
                )}
                
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-colors z-20"
                >
                  <X size={20} />
                </button>

                {/* MODAL PRICE TAG (Bottom Right on Image) */}
                <div className={`absolute bottom-4 right-4 px-3 py-1.5 rounded-lg border shadow-xl backdrop-blur-md z-10
                    ${selectedProduct.price === 0 
                        ? "bg-emerald-500/90 text-black border-emerald-400/50" 
                        : "bg-black/70 text-white border-white/10"
                    }`}
                >
                    <span className="font-bold text-sm tracking-wide">
                        {selectedProduct.price === 0 ? "FREE" : `$${selectedProduct.price}`}
                    </span>
                </div>
              </div>

              <div className="p-6 md:p-8 flex flex-col gap-6 overflow-y-auto">
                 
                 {/* TITLE ROW */}
                 <div className="flex justify-between items-start">
                    <div className="pr-4">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                            {selectedProduct.category || "Asset"}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                            {selectedProduct.title}
                        </h2>
                    </div>

                    {/* Instagram Button */}
                    {selectedProduct.price === 0 && (
                        <a 
                            href={INSTAGRAM_URL}
                            target="_blank"
                            className="shrink-0 w-10 h-10 bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 rounded-xl hover:bg-pink-500/10 hover:text-pink-400 hover:border-pink-500/30 transition-all flex items-center justify-center"
                            title="Get Password on Instagram"
                        >
                            <Instagram size={20} />
                        </a>
                    )}
                 </div>

                 {/* Description */}
                 <p className="text-zinc-300 leading-relaxed text-base md:text-lg">
                    {selectedProduct.description}
                 </p>

                 <div className="mt-auto">
                    <a 
                        href={selectedProduct.buy_link || "#"} 
                        target="_blank"
                        className={`w-full py-4 font-bold text-lg rounded-xl transition-colors flex items-center justify-center gap-2
                           ${selectedProduct.price === 0 
                               ? "bg-emerald-500 text-black hover:bg-emerald-400" 
                               : "bg-white text-black hover:bg-zinc-200"
                           }
                        `}
                    >
                        {selectedProduct.price === 0 ? "Download File" : "Purchase Now"} 
                        {selectedProduct.price === 0 ? <Download size={20} /> : <ShieldCheck size={20} />}
                    </a>
                    
                    {/* Footer Note */}
                    <div className="text-center mt-3 flex items-center justify-center gap-1.5 text-zinc-500">
                        {selectedProduct.price === 0 ? (
                             <span className="text-xs">Password required for zip. Check Instagram.</span>
                        ) : (
                             <>
                                <Lock size={12} />
                                <span className="text-xs">Secure checkout via Lemon Squeezy.</span>
                             </>
                        )}
                    </div>
                 </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}