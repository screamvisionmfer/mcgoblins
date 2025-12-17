"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  items: string[];
  fallback?: string;
  intervalMs?: number;
};

// Fast cycling preview for the hero block.
export function HeroCycle({ items, fallback = "/hero.png", intervalMs = 180 }: Props) {
  const list = useMemo(() => (items?.length ? items : [fallback]), [items, fallback]);
  const [idx, setIdx] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!list.length) return;
    // Prevent double-interval in React strict mode.
    if (startedRef.current) return;
    startedRef.current = true;

    const t = window.setInterval(() => {
      setIdx((i) => (i + 1) % list.length);
    }, intervalMs);
    return () => window.clearInterval(t);
  }, [list.length, intervalMs]);

  const src = list[idx] ?? fallback;

  return (
    <div className="relative h-full w-full">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={{ opacity: 0.0, filter: "blur(2px)" }}
          animate={{ opacity: 1.0, filter: "blur(0px)" }}
          exit={{ opacity: 0.0, filter: "blur(2px)" }}
          transition={{ duration: 0.14 }}
        >
          <Image
            src={src}
            alt="McGoblins preview"
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            className="object-contain"
            priority
          />
        </motion.div>
      </AnimatePresence>

      {/* Subtle console overlay */}
      <div className="pointer-events-none absolute inset-0 hero-scan" />
    </div>
  );
}
