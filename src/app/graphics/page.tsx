import ProjectGallery from "@/components/ProjectGallery";

export default function GraphicsPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-4">THE ARCHIVE</h1>
        <p className="text-zinc-400">Complete collection of commercial and personal works.</p>
      </div>

      {/* Pass isHome={false} (default) so it shows filters and all items */}
      <ProjectGallery isHome={false} />
    </main>
  );
}