/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", "monospace"],
      },
      keyframes: {
        scan: {
          "0%": { transform: "translateY(-20%)" },
          "100%": { transform: "translateY(120%)" },
        },
        flicker: {
          "0%, 100%": { opacity: "0.06" },
          "50%": { opacity: "0.12" },
        },
      },
      animation: {
        scan: "scan 5s linear infinite",
        flicker: "flicker 2.2s ease-in-out infinite",
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,.45)",
        lift: "0 18px 60px rgba(0,0,0,.55)",
      },
    },
  },
  plugins: [],
};
