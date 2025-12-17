export default function ConsoleFX() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.16] mix-blend-overlay [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:3px_3px]" />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.10] [background:repeating-linear-gradient(to_bottom,rgba(255,255,255,0.06)_0px,rgba(255,255,255,0.06)_1px,transparent_2px,transparent_5px)]" />
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 h-40 opacity-[0.10] blur-2xl bg-white/20 animate-scan" />
      <div className="pointer-events-none fixed inset-0 z-0 [box-shadow:inset_0_0_180px_rgba(0,0,0,0.9)]" />
    </>
  );
}
