"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Track = { title: string; src: string };

export default function FloatingPlayer() {
  const tracks: Track[] = useMemo(
    () => [
      { title: "Форель United", src: "/track1.mp3" },
      { title: "Форель United", src: "/track2.mp3" },
      { title: "Форель United", src: "/track3.mp3" },
    ],
    []
  );

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [idx, setIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Keep volume at ~20%
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = 0.2;
  }, []);

  // When track changes, load and (if playing) continue
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = tracks[idx].src;
    a.load();
    if (isPlaying) {
      a.play().catch(() => {
        // Autoplay can be blocked; keep UI state consistent
        setIsPlaying(false);
      });
    }
  }, [idx, isPlaying, tracks]);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) {
      a.pause();
      setIsPlaying(false);
      return;
    }
    a.play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  };

  const prev = () => setIdx((v) => (v - 1 + tracks.length) % tracks.length);
  const next = () => setIdx((v) => (v + 1) % tracks.length);

  return (
    <div className="fixed bottom-4 right-4 z-[60]">
      <div className="rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md shadow-[0_18px_80px_rgba(0,0,0,0.65)] px-3 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 transition"
            aria-label="Previous track"
          >
            ‹
          </button>
          <button
            onClick={toggle}
            className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 transition"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <button
            onClick={next}
            className="h-9 w-9 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 active:bg-white/15 transition"
            aria-label="Next track"
          >
            ›
          </button>

          <div className="min-w-0 pl-2 pr-1">
            <div className="text-xs font-[var(--font-mono)] tracking-[0.18em] text-white/70">
              PLAYER
            </div>
            <div className="text-sm text-white/85 truncate max-w-[180px]">
              {tracks[idx].title}
            </div>
          </div>
        </div>

        <audio
          ref={audioRef}
          src={tracks[idx].src}
          onEnded={next}
        />
      </div>
    </div>
  );
}
