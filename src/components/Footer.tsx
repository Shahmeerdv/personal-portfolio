"use client";
import { useState } from "react";
import { Copy, Check, Instagram, Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const email = "mshahmeer86@gmail.com"; 

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer className="border-t border-zinc-800 bg-black pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Big Call to Action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-10">
          <div>
            <h2 className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6">
              LET'S WORK <br /> TOGETHER
            </h2>
            <button 
              onClick={handleCopy}
              className="group flex items-center gap-3 px-5 py-3 rounded-full bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 transition-all active:scale-95"
            >
              <div className={`p-2 rounded-full ${copied ? 'bg-green-500/20 text-green-400' : 'bg-zinc-800 text-zinc-400'}`}>
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </div>
              <span className="text-zinc-300 font-mono text-sm">{copied ? "Email Copied!" : email}</span>
            </button>
          </div>

          {/* Social Links - UPDATED HERE */}
          <div className="flex gap-4">
             {[
               { icon: <Instagram size={20}/>, link: "https://www.instagram.com/msgraphics_10/" },
              //  { icon: <Twitter size={20}/>, link: "https://twitter.com/shamiirrr" },
               { icon: <Linkedin size={20}/>, link: "https://www.linkedin.com/in/muhammad-shahmeer-aaa3872a2?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" },
               { icon: <Github size={20}/>, link: "https://github.com/Shahmeerdv" },
             ].map((social, i) => (
               <a 
                 key={i} 
                 href={social.link}
                 target="_blank"             // <-- Opens in new tab
                 rel="noopener noreferrer"   // <-- Security best practice
                 className="p-4 rounded-full border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 hover:scale-110 transition-all"
               >
                 {social.icon}
               </a>
             ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-zinc-600 border-t border-zinc-900 pt-8">
           <p>© 2026. All rights reserved.</p>
           <p className="mt-2 md:mt-0">Faisalabad, Pakistan • Local Time: {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', timeZone: 'Asia/Karachi'})}</p>
        </div>
      </div>
    </footer>
  );
}