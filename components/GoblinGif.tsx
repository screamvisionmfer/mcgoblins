"use client";

export default function GoblinGif() {
    return (
        <div className="relative h-[min(72vh,820px)] w-[min(38vw,620px)] flex items-center justify-center">
            <img
                src="/goblins.gif"
                alt="McGoblins"
                className="max-h-full max-w-full object-contain select-none"
                draggable={false}
            />
        </div>
    );
}
