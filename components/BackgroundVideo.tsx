"use client";

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover grayscale opacity-80"
      >
        <source src="/mosh.mp4" type="video/mp4" />
      </video>

      {/* затемнение (не убивай видео полностью) */}
      <div className="pointer-events-none absolute inset-0 bg-black/60" />

      {/* мягкая виньетка */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_70px_rgba(0,0,0,0.95)]" />
    </div>
  );
}
