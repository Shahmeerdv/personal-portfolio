export default function BackgroundSpotlight() {
  return (
    <div className="fixed inset-0 -z-50 h-full w-full bg-black pointer-events-none">
      {/* This creates a subtle "glow" in the top-center.
         It's just a static CSS gradient = 0% Lag.
      */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-[radial-gradient(circle_800px_at_50%_-100px,#18181b,transparent)]" />
      
      {/* Optional: A very subtle grid pattern for texture (remove if you want pure smooth black) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
    </div>
  );
}