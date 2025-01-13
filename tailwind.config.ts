import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      "main-blue": "#00236C",
      "mountain-lake": "#87AEEE",
      tornado: "#798999",
      smoke: "#F4F4F4F4",
      "gray-900": "#333335",
      "gray-500": "#A0AEBC",
      "gray-400": "#BEBEBE",
      "gray-200": "#DDE0E3F4",
      "ice-cube": "#F6F9FF",
      "ice-cube-100": "#F1F7FF",
      red: "#E43451",
      success: "#00F386",
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
