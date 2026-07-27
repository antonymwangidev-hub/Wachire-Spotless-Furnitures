/** Wachira Spotless Furniture — Tailwind design tokens
 *  Brand palette and type scale are fixed by the client brief; layout,
 *  motion and the "growth ring" signature are ours to design within that.
 */
module.exports = {
  content: ["./index.html", "./main.js"],
  safelist: [
    // dynamically toggled by main.js — keep out of purge
    "hidden",
    "opacity-0",
    "opacity-100",
    "translate-y-0",
    "rotate-180",
    "scale-100",
    "scale-95",
    "is-visible",
  ],
  theme: {
    fontFamily: {
      display: ['"Playfair Display"', "Georgia", "serif"],
      sans: ["Inter", "system-ui", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4E342E", // walnut — headings, nav, primary surfaces
          dark: "#3A2621", // hover / pressed state
        },
        secondary: {
          DEFAULT: "#8D6E63", // mocha — supporting text, borders, secondary fills
          light: "#A8897E",
        },
        accent: {
          DEFAULT: "#D4AF37", // gold — the one accent, spent deliberately
          dark: "#B8942C",
        },
        cream: {
          DEFAULT: "#F5F1EB", // page background
          50: "#FBF9F6", // card / alt-section background, lighter than page bg
        },
        ink: "#2D2D2D", // body text
        whatsapp: "#25D366", // functional brand color for WhatsApp CTAs only
      },
      maxWidth: {
        content: "1280px",
      },
      boxShadow: {
        card: "0 2px 8px rgba(45, 33, 25, 0.06), 0 1px 2px rgba(45, 33, 25, 0.05)",
        "card-hover": "0 20px 40px -12px rgba(45, 33, 25, 0.25)",
        lift: "0 12px 28px -8px rgba(45, 33, 25, 0.35)",
      },
      transitionTimingFunction: {
        signature: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
