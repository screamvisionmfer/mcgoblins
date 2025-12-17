"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type MouseEvent } from "react";

type Props = {
  items: string[];
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// Horizontal infinite gallery with smooth speed changes + “Mac dock” magnification.
export function DockMarqueeGallery({ items }: Props) {
  const base = useMemo(() => items ?? [], [items]);
  const loop = useMemo(() => [...base, ...base, ...base], [base]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rafRef = useRef<number | null>(null);
  const lastTRef = useRef<number | null>(null);
  const xRef = useRef(0);

  // Speed (px/s)
  const speedRef = useRef(260);
  const targetSpeedRef = useRef(260);
  const boostRef = useRef(0);

  const [hovered, setHovered] = useState(false);
  const [scales, setScales] = useState<number[]>([]);
  const [offsets, setOffsets] = useState<number[]>([]);
  const [halfWidth, setHalfWidth] = useState<number>(0);

  const moveRaf = useRef<number | null>(null);
  const lastX = useRef<number>(0);

  useEffect(() => {
    setScales(new Array(loop.length).fill(1));
    setOffsets(new Array(loop.length).fill(0));
  }, [loop.length]);

  // Measure one “cycle” width (we render 3x, we wrap by 1x).
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const kids = Array.from(trackRef.current.children) as HTMLElement[];
      if (!kids.length) return;

      const third = Math.floor(kids.length / 3);
      let w = 0;
      for (let i = 0; i < third; i++) {
        const el = kids[i];
        const r = el.getBoundingClientRect();
        w += r.width;
      }

      // Add gaps (track uses CSS gap)
      const style = window.getComputedStyle(trackRef.current);
      const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
      w += gap * Math.max(0, third - 1);
      setHalfWidth(w);
    };

    const t = window.setTimeout(measure, 40);
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, [loop.length]);

  // Smooth marquee loop.
  useEffect(() => {
    if (!trackRef.current) return;
    const track = trackRef.current;

    const tick = (t: number) => {
      if (lastTRef.current == null) lastTRef.current = t;
      const dt = Math.min(0.033, (t - lastTRef.current) / 1000);
      lastTRef.current = t;

      // Smooth towards target speed, with temporary wheel boost.
      boostRef.current = lerp(boostRef.current, 0, 0.06);
      const target = targetSpeedRef.current + boostRef.current;
      speedRef.current = lerp(speedRef.current, target, 0.08);

      xRef.current -= speedRef.current * dt;
      if (halfWidth > 0) {
        // Wrap seamlessly.
        if (xRef.current <= -halfWidth) xRef.current += halfWidth;
        if (xRef.current >= 0) xRef.current -= halfWidth;
      }

      track.style.transform = `translate3d(${xRef.current}px,0,0)`;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current != null) window.cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTRef.current = null;
    };
  }, [halfWidth]);

  // Hover slowdown target.
  useEffect(() => {
    targetSpeedRef.current = hovered ? 110 : 260;
  }, [hovered]);

  const applyDock = (clientX: number) => {
    const rects = itemRefs.current.map((el) => el?.getBoundingClientRect());

    // Smooth “Mac dock” feel: center grows, neighbors grow less.
    // Gaussian falloff keeps it modern and non-janky.
    const sigma = 190; // px
    const maxScale = 1.32;
    const maxLift = 14; // px

    const sNext = rects.map((r) => {
      if (!r) return 1;
      const center = r.left + r.width / 2;
      const d = clientX - center;
      const g = Math.exp(-(d * d) / (2 * sigma * sigma));
      return 1 + (maxScale - 1) * g;
    });

    const oNext = rects.map((r) => {
      if (!r) return 0;
      const center = r.left + r.width / 2;
      const d = clientX - center;
      const g = Math.exp(-(d * d) / (2 * sigma * sigma));
      return -maxLift * g;
    });

    setScales(sNext);
    setOffsets(oNext);
  };

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!hovered) return;
    lastX.current = e.clientX;
    if (moveRaf.current != null) return;
    moveRaf.current = window.requestAnimationFrame(() => {
      moveRaf.current = null;
      applyDock(lastX.current);
    });
  };

  const onLeave = () => {
    setHovered(false);
    setScales(new Array(loop.length).fill(1));
    setOffsets(new Array(loop.length).fill(0));
  };

  const onWheel: React.WheelEventHandler<HTMLDivElement> = (e) => {
    // Natural: wheel down -> speed up slightly; wheel up -> slow / reverse slightly.
    const delta = clamp(e.deltaY, -120, 120);
    boostRef.current += delta * 1.6;
    boostRef.current = clamp(boostRef.current, -420, 520);
  };

  if (!base.length) {
    return (
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 font-console text-lg text-white/60">
        Drop images into <span className="text-white/80">/public/arts</span> to build the gallery.
      </div>
    );
  }

  return (
    <div className="mt-6 dock-wrap" onWheel={onWheel}>
      <div className="dock-vignette" />

      <div
        ref={viewportRef}
        className={"dock-viewport" + (hovered ? " is-hover" : "")}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
      >
        <div ref={trackRef} className="dock-track">
          {loop.map((src, i) => (
            <div
              key={`${src}-${i}`}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="dock-item"
              style={{
                transform: `translate3d(0,${offsets[i] ?? 0}px,0) scale(${scales[i] ?? 1})`,
                zIndex: Math.round((scales[i] ?? 1) * 100),
              }}
            >
              <div className="dock-card">
                <div className="relative aspect-[2/3] w-[140px] sm:w-[160px] md:w-[175px]">
                  <Image
                    src={src}
                    alt={`McGoblin ${i + 1}`}
                    fill
                    sizes="175px"
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 font-console text-base text-white/50">
        Hover to slow down • Scroll to nudge speed • Move cursor to magnify
      </div>
    </div>
  );
}
