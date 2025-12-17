const LINKS = {
  x: "https://x.com/scream_vision",
  vibemarket: "#", // TODO: replace with your VibeMarket URL
};

function ButtonShell({
  href,
  title,
  subtitle,
  accent = false,
}: {
  href: string;
  title: string;
  subtitle: string;
  accent?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className={[
        "group w-full rounded-2xl border px-5 py-4 transition-all duration-200",
        "hover:-translate-y-0.5 active:translate-y-0",
        accent
          ? "border-fuchsia-300/25 bg-fuchsia-500/18 hover:bg-fuchsia-500/26 hover:shadow-neonStrong vibemarket-glow"
          : "border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:shadow-neon",
      ].join(" ")}
    >
      <div className="flex items-center justify-between">
        <span className="font-[var(--font-mono)] text-xs tracking-[0.22em] text-white/70">
          {title}
        </span>
        <span className="text-white/90 font-medium group-hover:text-white transition">
          OPEN
        </span>
      </div>
      <div className="mt-2 text-sm text-white/55 group-hover:text-white/75 transition">
        {subtitle}
      </div>
    </a>
  );
}

export default function RightPanel() {
  return (
    <div className="w-full flex flex-col items-stretch gap-3 lg:items-end lg:w-[min(380px,24vw)]">
      <ButtonShell href={LINKS.x} title="X" subtitle="x.com/scream_vision" />
      <ButtonShell href={LINKS.vibemarket} title="VIBEMARKET" subtitle="Mint Chapter I" accent />

      <div className="relative group w-full">
        <button
          disabled
          className="w-full rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 text-left opacity-70 cursor-not-allowed"
        >
          <div className="flex items-center justify-between">
            <span className="font-[var(--font-mono)] text-xs tracking-[0.22em] text-white/60">
              OPENSEA
            </span>
            <span className="text-white/70 font-medium">LOCKED</span>
          </div>
          <div className="mt-2 text-sm text-white/45">Chapter II (6,666)</div>
        </button>

        <div className="pointer-events-none absolute right-[105%] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition">
          <div className="rounded-xl border border-white/10 bg-black/90 px-3 py-2 text-xs font-[var(--font-mono)] tracking-[0.18em] text-white/80 shadow-[0_18px_80px_rgba(0,0,0,0.65)]">
            COMING SOON
          </div>
        </div>
      </div>
    </div>
  );
}
