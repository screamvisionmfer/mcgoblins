import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flicker: { "0%,100%": { opacity: "0.96" }, "50%": { opacity: "0.86" } },
        scan: { "0%": { transform: "translateY(-15%)" }, "100%": { transform: "translateY(115%)" } },
        glow: { "0%,100%": { opacity: "0.5" }, "50%": { opacity: "0.9" } },
      },
      animation: {
        flicker: "flicker 2.2s infinite",
        scan: "scan 6.5s linear infinite",
        glow: "glow 1.6s ease-in-out infinite",
      },
      boxShadow: {
        neon: "0 0 0 1px rgba(255,255,255,0.08), 0 0 40px rgba(217,70,239,0.18)",
        neonStrong: "0 0 0 1px rgba(255,255,255,0.12), 0 0 60px rgba(217,70,239,0.28)",
      }
    },
  },
  plugins: [],
} satisfies Config;
