export default function CRT() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* scanlines */}
      <div className="absolute inset-0 opacity-[0.045] [background:repeating-linear-gradient(0deg,rgba(255,255,255,.8)_0,rgba(255,255,255,.8)_1px,transparent_1px,transparent_4px)]" />
      {/* noise */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-[url('/noise.png')]" />
      {/* vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_55%,rgba(0,0,0,.55))]" />
    </div>
  );
}
