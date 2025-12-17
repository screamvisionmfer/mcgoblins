"use client";

import { useEffect, useState } from "react";

export default function BootLoader({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 650);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {!ready && (
        <div className="fixed inset-0 z-[9999] bg-zinc-950">
          <div className="absolute inset-0 pointer-events-none opacity-70">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(0,255,190,.10),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(255,0,170,.08),transparent_55%)]" />
            <div className="absolute inset-0 animate-flicker bg-[linear-gradient(transparent,rgba(255,255,255,.06),transparent)]" />
          </div>
          <div className="h-full flex items-center justify-center px-6">
            <div className="w-full max-w-xl">
              <div className="text-xs tracking-widest text-zinc-300">SYSTEM BOOT</div>
              <div className="mt-2 text-3xl font-black tracking-tight">
                McGoblins<span className="text-fuchsia-400">.exe</span>
              </div>
              <div className="mt-4 h-2 rounded-full bg-zinc-800 overflow-hidden">
                <div className="h-full w-[72%] bg-fuchsia-400/80 animate-pulse" />
              </div>
              <div className="mt-3 text-[11px] text-zinc-400">
                Initializing UI…
              </div>
            </div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
