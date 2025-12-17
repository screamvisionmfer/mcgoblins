"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ARTS } from "../app/arts";

export default function ArtRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setIndex((v) => (v + 1) % ARTS.length);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image
        key={ARTS[index]}
        src={ARTS[index]}
        alt="McGoblins Art"
        width={800}
        height={1200}
        priority
        className="max-h-[90vh] w-auto object-contain transition-opacity duration-500"
      />
    </div>
  );
}
