"use client";

import { useEffect, useState } from "react";
import ConsoleFX from "../components/ConsoleFX";
import Preloader from "../components/Preloader";
import LeftPanel from "../components/LeftPanel";
import RightPanel from "../components/RightPanel";

export default function Page() {
  const [bootDone, setBootDone] = useState(false);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0);

  // total staged reveal ~5s (2s boot + ~3s reveal)
  useEffect(() => {
    if (!bootDone) return;
    const t1 = window.setTimeout(() => setPhase(1), 120);
    const t2 = window.setTimeout(() => setPhase(2), 900);
    const t3 = window.setTimeout(() => setPhase(3), 1700);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [bootDone]);

  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden overflow-y-auto text-white xl:h-screen xl:overflow-hidden">
      <ConsoleFX />
      {!bootDone && <Preloader onDone={() => setBootDone(true)} />}

      <div className="relative z-10 w-full px-[min(64px,4vw)] py-10 xl:h-full xl:py-0">
        <div className="mx-auto w-full max-w-[2200px] xl:h-full">
          <div className="w-full flex flex-col items-center justify-start gap-10 xl:h-full xl:grid xl:grid-cols-[1fr_1.25fr_1fr] xl:items-center xl:justify-center">
            {/* 1) Logo + description */}
            <div className={[
              "w-full flex justify-center lg:justify-start",
              "transition-all duration-700 ease-out",
              bootDone && phase >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}>
              <LeftPanel />
            </div>

            {/* 2) Hero media */}
            <div className={[
              "w-full flex justify-center",
              "transition-all duration-700 ease-out",
              bootDone && phase >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}>
              <picture>
                <source srcSet="/hero.gif" type="image/gif" />
                <img
                  src="/hero.jpg"
                  alt="McGoblins hero"
                  className="w-full max-w-[560px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl"
                  loading="eager"
                />
              </picture>
            </div>

            {/* 3) Buttons */}
            <div className={[
              "w-full flex justify-center lg:justify-end",
              "transition-all duration-700 ease-out",
              bootDone && phase >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            ].join(" ")}>
              <div className="w-full max-w-[380px]">
                <RightPanel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
