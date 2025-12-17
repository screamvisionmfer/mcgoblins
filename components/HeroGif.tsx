export default function HeroGif() {
  return (
    <div className="relative w-full">
      <img
        src="/hero.gif"
        alt="McGoblins hero"
        className="block w-full h-auto max-h-[78vh] object-contain"
        draggable={false}
      />
    </div>
  );
}
