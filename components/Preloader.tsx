"use client";

import { useEffect, useMemo, useState } from "react";

const LINES = [
  "BOOTING MCGOBLINS OS…",
  "CHECKING CARTRIDGE… OK",
  "SYNCING ART CACHE…",
  "CALIBRATING CRT…",
  "READY",
];

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [step, setStep] = useState(0);
  const schedule = useMemo(() => [0, 320, 740, 1220, 1700], []);

  useEffect(() => {
    const timers = schedule.map((ms, idx) =>
      window.setTimeout(() => setStep(idx + 1), ms)
    );
    const done = window.setTimeout(onDone, 2000);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.clearTimeout(done);
    };
  }, [onDone, schedule]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      <div className="w-[min(720px,92vw)] rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04),0_30px_120px_rgba(0,0,0,0.7)]">
        <div className="mb-4 flex items-center justify-between">
          <div className="font-[var(--font-mono)] text-xs tracking-[0.22em] text-white/70">SYSTEM</div>
          <div className="font-[var(--font-mono)] text-xs tracking-[0.22em] text-fuchsia-300/90">LIVE</div>
        </div>

        <div className="space-y-2 font-[var(--font-mono)] text-sm text-white/85">
          {LINES.slice(0, step).map((t) => (
            <div key={t} className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400/80 shadow-[0_0_18px_rgba(217,70,239,0.7)]" />
              <span>{t}</span>
            </div>
          ))}
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-fuchsia-400/70 transition-[width] duration-300"
              style={{ width: `${Math.min(100, (step / LINES.length) * 120)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
