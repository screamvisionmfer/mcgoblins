export default function RightLinks() {
  return (
    <div className="flex flex-col gap-4 items-end">
      <a
        href="https://x.com/scream_vision"
        target="_blank"
        className="px-6 py-3 bg-white text-black font-medium hover:bg-white/80"
      >
        X / Twitter
      </a>

      <button
        className="
    border border-yellow-400/40
    bg-yellow-400/5
    shadow-[0_0_20px_rgba(255,215,0,0.35),0_0_60px_rgba(255,215,0,0.15)]
  "
      >
        VIBEMARKET
      </button>


      <div className="relative group">
        <button
          disabled
          className="px-6 py-3 bg-gray-700 text-gray-300 cursor-not-allowed"
        >
          OpenSea
        </button>
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2
                        opacity-0 group-hover:opacity-100 transition
                        bg-black text-white text-xs px-3 py-1 whitespace-nowrap">
          Coming Soon
        </div>
      </div>
    </div>
  );
}
