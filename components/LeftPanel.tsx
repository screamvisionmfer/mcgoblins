import Image from "next/image";

export default function LeftPanel() {
  return (
    <div className="w-full max-w-[560px] lg:w-[min(520px,30vw)] text-center lg:text-left">
      <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 shadow-neon mx-auto lg:mx-0">
        <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400/90 shadow-[0_0_18px_rgba(217,70,239,0.65)]" />
        <span className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/70">
          666 PFP CARDS • OPEN ON OPENSEA
        </span>
      </div>

      <div className="mt-6 flex justify-center lg:justify-start">
        <Image
          src="/logo.png"
          alt="McGoblins"
          width={1200}
          height={400}
          priority
          className="h-[190px] w-auto select-none"
        />
      </div>

      <div className="mt-6 space-y-4 text-white/75 leading-relaxed">
        <p>
          McGoblins is a 666-piece PFP card collection for punk goblins,
          basement anarchists and street troublemakers.
        </p>
        <p>
          Meet the full crew, explore every card and collect your favorite
          McGoblin exclusively on OpenSea.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/55">
            SUPPLY
          </div>
          <div className="mt-2 text-2xl font-semibold text-white/90">666</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-[var(--font-mono)] text-[11px] tracking-[0.22em] text-white/55">
            MARKETPLACE
          </div>
          <div className="mt-2 text-2xl font-semibold text-white/90">OpenSea</div>
        </div>
      </div>
    </div>
  );
}
