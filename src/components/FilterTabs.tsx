"use client";

interface TabProps {
  current: string;
  onChange: (value: string) => void;
}

export default function FilterTabs({ current, onChange }: TabProps) {
  const tabs = ["All", "Graphics", "Software"];

  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex rounded-full border border-white/10 bg-zinc-900/50 p-1 backdrop-blur-md">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              current === tab
                ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}