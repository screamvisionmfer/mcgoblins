"use client";

import Image from "next/image";

type Props = {
  items: string[];
};

export default function DockCarousel({ items }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <div className="w-full overflow-hidden py-24">
      <div className="flex gap-8 px-24">
        {items.map((src, i) => (
          <div
            key={i}
            className="transition-transform duration-300 ease-out hover:scale-110"
          >
            <Image
              src={src}
              alt=""
              width={420}
              height={630}
              className="object-contain select-none"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
