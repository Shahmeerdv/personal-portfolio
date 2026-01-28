import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LegalPageLayout({ title, date, children }: { title: string, date: string, children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black text-zinc-300 py-20 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <Link href="/store1" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Store
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{title}</h1>
        <p className="text-zinc-500 mb-12">Last Updated: {date}</p>
        
        <div className="space-y-8 leading-relaxed text-lg">
          {children}
        </div>
      </div>
    </main>
  );
}