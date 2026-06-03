/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: {
            DEFAULT: "#004aad", // premium cobalt blue
            dark: "#002868",    // deep navy
            light: "#3b82f6",   // slate blue
            tint: "#f0f7ff",    // blue background tint
          },
          green: {
            DEFAULT: "#00875a", // high premium green
            dark: "#005c3e",    // deep forest green
            light: "#10b981",   // emerald
            tint: "#f0fdf4",    // green background tint
          },
          yellow: {
            DEFAULT: "#f59e0b", // highlights/little yellow
            light: "#fffbeb",
          },
          dark: "#0f172a",
          light: "#ffffff",
        }
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        }
      }
    },
  },
  plugins: [],
};
