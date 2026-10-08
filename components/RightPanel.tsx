const LINKS = {
  drop: "https://zaibatsuwagies.com/",
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
          ? "border-fuchsia-300/25 bg-fuchsia-500/18 hover:bg-fuchsia-500/26 hover:shadow-neonStrong opensea-glow"
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
      <ButtonShell
        href={LINKS.drop}
        title="ZAIBATSU WAGIES"
        subtitle="Explore the drop • 2222 unique artworks"
        accent
      />
    </div>
  );
}
