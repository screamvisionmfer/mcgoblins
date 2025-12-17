"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  items: string[];
  pageSize?: number;
};

export function Gallery({ items, pageSize = 24 }: Props) {
  const [count, setCount] = useState(pageSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visible = useMemo(() => items.slice(0, count), [items, count]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const el = sentinelRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setCount((c) => Math.min(items.length, c + pageSize));
        }
      },
      { rootMargin: "900px 0px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [items.length, pageSize]);

  return (
    <div className="mt-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visible.map((src, i) => (
          <motion.div
            key={src}
            className="card-hover"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.22 }}
          >
            <div className="glitch-overlay" />
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={src}
                alt={`McGoblin #${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                className="object-cover"
                priority={i < 4}
              />
            </div>

            <div className="flex items-center justify-between gap-3 px-3 py-2">
              <div className="font-console text-base text-white/80">#{String(i + 1).padStart(3, "0")}</div>
              <div className="font-console text-base text-[var(--accent)]">READY</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div ref={sentinelRef} className="h-10" />

      <div className="mt-3 font-console text-base text-white/50">
        {count < items.length ? "Loading more…" : "End of feed."}
      </div>
    </div>
  );
}
