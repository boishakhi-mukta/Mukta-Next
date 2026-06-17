/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["var(--font-poppins)", "Poppins", "sans-serif"],
        inter: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      colors: {
        // Light palette
        "portfolio-bg": "#f7f5fb",
        "portfolio-primary": "#744ca0",
        "portfolio-secondary": "#8a61c1",
        "portfolio-accent": "#a98be0",
        // Dark palette
        "portfolio-bg-dark": "#0f0b17",
        "portfolio-primary-dark": "#9d78d9",
        "portfolio-secondary-dark": "#8a61c1",
        "portfolio-accent-dark": "#c4a8f0",
      },
    },
  },
  plugins: [],
};
